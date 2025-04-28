import { prisma } from "db/prisma";
import { createClient } from "redis";

export const messageQueueWorker = async () => {
  const redisClient = createClient({
    url: "redis://localhost:6379",
  });
  await redisClient.connect()
  while (true) {
    try {
      const result = await redisClient.BRPOP("chats", 0);
      if (!result) {
        continue;
      }

      const { element: chatJson } = result;
      let chat = null;
      try {
        chat = JSON.parse(chatJson);
      } catch (e) {
        continue;
      }

      if (!chat) {
        continue;
      }
      await prisma.chat.create({
        data: {
          roomId: Number(chat.roomId),
          message: chat.message.toString(),
          userId: chat.userId,
        },
      });
    } catch (e) {
      console.log(e);
      console.log("worker stoppped");
    }
  }
};
