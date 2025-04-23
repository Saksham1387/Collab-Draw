import { WebSocket, WebSocketServer } from "ws";
import { verifyUser } from "./utils";
import { prisma } from "db/prisma";

const wss = new WebSocketServer({ port: 8081 });

interface User {
  id: string;
  ws: WebSocket;
  rooms: string[];
}

const users: User[] = [];

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
    console.log("here");
    let parsedData;
    console.log(data);
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
      console.log(parsedData);
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
      console.log(parsedData);
    }

    if (parsedData.type === "join_room") {
      // { type: "join_room" , roomId : "321"}
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user.rooms.filter((x) => x === parsedData.roomId);
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      // TODO: Use Queues here
      await prisma.chat.create({
        data: {
          roomId,
          message,
          userId,
        },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          console.log("Fds");

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
  });
});
