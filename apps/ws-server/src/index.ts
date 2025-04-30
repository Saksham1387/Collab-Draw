import { WebSocketChatServer } from "./wsLayer";

async function startServer(): Promise<WebSocketChatServer> {
  const server = new WebSocketChatServer(8081);
  try {
    await server.initialize();
    console.log("Chat server started on port 8081");
    return server;
  } catch (err) {
    console.error("Failed to start application:", err);
    process.exit(1);
  }
}

startServer()