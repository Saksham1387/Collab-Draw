import { WebSocket, WebSocketServer } from "ws";
import { verifyUser } from "./utils";
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

class ChatWebSocketServer {
  private wss: WebSocketServer;
  private redisClient: RedisClientType;
  private users: User[] = [];

  constructor(url: string, port: number) {
    this.wss = new WebSocketServer({ port });
    this.redisClient = createClient({
      url,
    });

    this.setupWebSocket;
  }

  setupWebSocket() {
    this.wss.on("connection", this.handleConnection.bind(this));
  }

  handleConnection(ws: WebSocket, req: Request) {
    const url = req.url;
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

    this.addUser(userId, ws);
    this.initSocketConnections(ws);
  }

  initSocketConnections(ws: WebSocket) {
    ws.on("error", this.handleError);
    ws.on("message", this.handleMessage.bind(this, ws));
    ws.on("close", this.handleClose.bind(this, ws));
  }

  addUser(userId: string, ws: WebSocket) {
    this.users.push({
      id: userId,
      ws,
      rooms: [],
    });
  }
}
