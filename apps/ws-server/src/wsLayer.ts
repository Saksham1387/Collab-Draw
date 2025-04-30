import { WebSocket, WebSocketServer } from "ws";
import { verifyUser } from "./utils";
import { messageQueueWorker } from "./woker";
import { createClient, type RedisClientType } from "redis";

interface User {
  id: string;
  ws: WebSocket;
  rooms: string[];
}

interface ChatMessage {
  roomId: string;
  message: string;
  userId: string;
}

interface ClientMessage {
  type: string;
  roomId?: string;
  message?: string;
}

export class WebSocketChatServer {
  private wss: WebSocketServer;
  private redisClient: RedisClientType;
  private users: User[] = [];

  constructor(port: number, redisUrl: string = "redis://localhost:6379") {
    this.wss = new WebSocketServer({ port });
    this.redisClient = createClient({ url: redisUrl });
    
    this.setupWebSocketServer();
  }

  async initialize(): Promise<void> {
    try {
      await this.redisClient.connect();
      await messageQueueWorker();
      console.log("WebSocket server initialized successfully");
    } catch (err) {
      console.error("Failed to initialize WebSocket server:", err);
      throw err;
    }
  }

  private setupWebSocketServer(): void {
    this.wss.on("connection", this.handleConnection.bind(this));
  }

  private handleConnection(ws: WebSocket, request: any): void {
    const url = request.url;
    if (!url) {
      ws.close();
      return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") ?? "";
    const userId = verifyUser(token);

    if (userId == null) {
      ws.close();
      return;
    }

    this.addUser(userId, ws);
    this.setupUserEventHandlers(ws);
  }

  private addUser(userId: string, ws: WebSocket): void {
    this.users.push({
      id: userId,
      ws,
      rooms: [],
    });
  }

  private setupUserEventHandlers(ws: WebSocket): void {
    ws.on("error", this.handleError);
    ws.on("message", this.handleMessage.bind(this, ws));
    ws.on("close", this.handleClose.bind(this, ws));
  }

  private handleError(error: Error): void {
    console.log("WebSocket error:", error);
  }

  private async handleMessage(ws: WebSocket, data: WebSocket.Data): Promise<void> {
    let parsedData: ClientMessage;

    try {
      if (typeof data !== "string") {
        parsedData = JSON.parse(data.toString());
      } else {
        parsedData = JSON.parse(data);
      }
    } catch (error) {
      console.error("Failed to parse message:", error);
      return;
    }

    switch (parsedData.type) {
      case "join_room":
        this.handleJoinRoom(ws, parsedData.roomId as string);
        break;
      case "leave_room":
        this.handleLeaveRoom(ws, parsedData.roomId as string);
        break;
      case "chat":
        await this.handleChat(ws, parsedData.roomId as string, parsedData.message as string);
        break;
      case "get_room_users":
        this.handleGetRoomUsers(ws, parsedData.roomId as string);
        break;
      default:
        console.warn("Unknown message type:", parsedData.type);
    }
  }

  private handleJoinRoom(ws: WebSocket, roomId: string): void {
    const user = this.getUserByWs(ws);
    if (!user) return;

    user.rooms.push(roomId);
    console.log("User", user.id, "joined room", roomId);
    this.broadcastRoomUsers(roomId);
  }

  private handleLeaveRoom(ws: WebSocket, roomId: string): void {
    const user = this.getUserByWs(ws);
    if (!user) return;

    const wasInRoom = user.rooms.includes(roomId);
    user.rooms = user.rooms.filter((x) => x !== roomId); // Fixed filter logic
    
    console.log("User", user.id, "left room", roomId);
    
    if (wasInRoom) {
      this.broadcastRoomUsers(roomId);
    }
  }

  private async handleChat(ws: WebSocket, roomId: string, message: string): Promise<void> {
    const user = this.getUserByWs(ws);
    if (!user) return;

    const chat: ChatMessage = { roomId, message, userId: user.id };

    try {
      await this.redisClient.lPush("chats", JSON.stringify(chat));
      this.broadcastToRoom(roomId, {
        type: "chat",
        message,
        roomId,
      });
    } catch (e) {
      console.error("Redis error:", e);
      ws.send(
        JSON.stringify({ type: "error", message: "Failed to save message" })
      );
    }
  }

  private handleGetRoomUsers(ws: WebSocket, roomId: string): void {
    const roomUsers = this.getRoomUsers(roomId);
    ws.send(JSON.stringify({
      type: "room_users",
      roomId,
      users: roomUsers,
      count: roomUsers.length
    }));
  }

  private handleClose(ws: WebSocket): void {
    const userIndex = this.users.findIndex((user) => user.ws === ws);
    if (userIndex !== -1) {
      const user = this.users[userIndex];
      
      // Notify all rooms that the user was in
      const userRooms = [...user.rooms];
      
      // Remove user
      this.users.splice(userIndex, 1);
      
      // Broadcast updated user lists to all affected rooms
      userRooms.forEach(roomId => {
        this.broadcastRoomUsers(roomId);
      });
      
      console.log("User disconnected. Removed user:", user.id);
    }
  }

  private getUserByWs(ws: WebSocket): User | undefined {
    return this.users.find((user) => user.ws === ws);
  }

  private getRoomUsers(roomId: string): { id: string; name?: string }[] {
    const uniqueUserIds = [...new Set(
      this.users
        .filter((user) => user.rooms.includes(roomId))
        .map((user) => user.id)
    )];
    
    return uniqueUserIds.map(id => ({ id }));
  }

  private broadcastRoomUsers(roomId: string): void {
    const roomUsers = this.getRoomUsers(roomId);
    
    this.broadcastToRoom(roomId, {
      type: "room_users",
      roomId,
      users: roomUsers,
      count: roomUsers.length,
    });
  }

  private broadcastToRoom(roomId: string, message: any): void {
    let messagesSent = 0;
    this.users.forEach((user) => {
      if (user.rooms.includes(roomId)) {
        messagesSent++;
        user.ws.send(JSON.stringify(message));
      }
    });
    console.log(`Broadcasted to ${messagesSent} users in room ${roomId}`);
  }

  public shutdown(): void {
    this.wss.close(() => {
      console.log("WebSocket server closed");
    });
    
    this.redisClient.disconnect().catch(err => {
      console.error("Error disconnecting Redis client:", err);
    });
  }
}
