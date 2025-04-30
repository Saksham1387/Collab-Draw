import { prisma } from "@repo/db/prisma";
import { CreateRoomSchema } from "common/types";
import { type Request, type Response } from "express";

const createRoom = async (req: Request, res: Response) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  const userId = req.userId;
  if (!userId) {
    res.json({
      message: "No user",
    });
    return;
  }
  const room = await prisma.room.create({
    data: {
      slug: parsedData.data.name,
      name: parsedData.data.name,
      adminId: userId,
    },
  });
  res.json({ room, message: "joined room" });
};

const getRoomBySlug = async (req: Request, res: Response) => {
  const slug = req.params.slug;

  const room = await prisma.room.findFirst({
    where: {
      slug,
    },
  });

  res.json({ room });
};

export const roomController = {
  createRoom,
  getRoomBySlug
};
