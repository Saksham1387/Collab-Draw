import { prisma } from "db/prisma";
import type { Request, Response } from "express";

export const getDashboard = async (req: Request, res: Response) => {

  console.log("Data Fetched")
  const rooms = await prisma.room.findMany({
    where: {
      adminId: req.userId,
    },
  });

  const roomCount = await prisma.room.count({
    where: {
      adminId: req.userId,
    },
  });

  const recentlyEditedRooms = await prisma.room.findMany({
    where: {
      adminId: req.userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
  });

  const responseData = {
    rooms,
    totalRooms: roomCount,
    recentlyEditedRooms,
  };

  res.json(responseData).sendStatus(200);
};

export const dashboardController = {
  getDashboard,
};
