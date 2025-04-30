import { prisma } from "db/prisma";
import type { Request, Response } from "express";

const getChatByRoomId = async (req: Request, res: Response) => {
  const roomId = Number(req.params.roomId);
  const chats = await prisma.chat.findMany({
    where: {
      roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 50,
  });

  res.json({ chats });
};

export const chatsController = {
  getChatByRoomId,
};
