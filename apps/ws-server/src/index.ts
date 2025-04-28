import { WebSocket, WebSocketServer } from "ws";
import { verifyUser } from "./utils";
import { messageQueueWorker } from "./woker";
import { createClient } from "redis";

const wss = new WebSocketServer({ port: 8081 });

const redisClient = createClient({
  url: "redis://localhost:6379",
});

await redisClient.connect();
interface User {
  id: string;
  ws: WebSocket;
  rooms: string[];
}

const start = async () => {
  await messageQueueWorker();
};

start().catch((err) => {
  console.error("Failed to start application:", err);
  process.exit(1);
});

const users: User[] = [];

function getRoomUsers(roomId: string): { id: string; name?: string }[] {
  const uniqueUserIds = [...new Set(
    users
      .filter((user) => user.rooms.includes(roomId))
      .map((user) => user.id)
  )];
  
  return uniqueUserIds.map(id => {
    const user = users.find(u => u.id === id);
    return { 
      id
    };
  });
}

function broadcastRoomUsers(roomId: string): void {
  const roomUsers = getRoomUsers(roomId);
  const count = roomUsers.length;

  users.forEach((user) => {
    if (user.rooms.includes(roomId)) {
      user.ws.send(
        JSON.stringify({
          type: "room_users",
          roomId,
          users: roomUsers,
          count,
        })
      );
    }
  });
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") ?? "";

  const userId = verifyUser(token);

  if (userId == null) {
    ws.close();
    return null;
  }

  users.push({
    id: userId,
    ws,
    rooms: [],
  });

  ws.on("error", (e) => {
    console.log(e);
  });
  ws.on("message", async function message(data) {
    let parsedData;

    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
    }

    if (parsedData.type === "join_room") {
      // { type: "join_room" , roomId : "321"}

      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
      console.log("room join",parsedData.roomId)
      broadcastRoomUsers(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      const wasInRoom = user.rooms.includes(parsedData.roomId);
      user.rooms = user.rooms.filter((x) => x === parsedData.roomId);
      console.log("room left",parsedData.roomId)
      if (wasInRoom) {
        broadcastRoomUsers(parsedData.roomId);
      }
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }

      const chat = JSON.stringify({ roomId, message, userId: user.id });

      try {
        await redisClient.lPush("chats", chat);
      } catch (e) {
        console.error("Redis error:", e);
        ws.send(
          JSON.stringify({ type: "error", message: "Failed to save message" })
        );
      }

      let messagesSent = 0;
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          messagesSent++;
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message,
              roomId,
            })
          );
        }
      });
    }

    if (parsedData.type === "get_room_users") {
      const roomId = parsedData.roomId;
      const roomUsers = getRoomUsers(roomId);
      ws.send(JSON.stringify({
        type: "room_users",
        roomId,
        users: roomUsers,
        count: roomUsers.length
      }));
    }
  });

  ws.on("close", () => {
    console.log("connection closed");
  });
});
