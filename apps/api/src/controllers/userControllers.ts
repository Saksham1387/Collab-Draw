import { prisma } from "@repo/db/prisma";
import type { Request, Response } from "express";

const getUserInfo = async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.userId,
    },
  });

  res.json(user).sendStatus(200);
};


export const userController = {
    getUserInfo
}