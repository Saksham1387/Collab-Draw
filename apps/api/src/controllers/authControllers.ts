import { prisma } from "@repo/db/prisma";
import { JWT_SECRET } from "common/config";
import { CreateUserSchema, SigninSchema } from "common/types";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AvatarGenerator } from "random-avatar-generator";
 
const generator = new AvatarGenerator();
const signIn = async (req: Request, res: Response) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: data.data?.email,
    },
  });

  if (data.data.password !== user?.password) {
    res.sendStatus(401).json({
      message: "Wrong password",
    });
    return;
  }
  if (!user) {
    res
      .json({
        message: "user does not exsist",
      })
      .sendStatus(405);
    return;
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res
    .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 })
    .status(200)
    .json({ message: "Login Succesfull" });
};

const signUp = async (req: Request, res: Response) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }
  const image = generator.generateRandomAvatar();
  const user = await prisma.user.create({
    data: {
      email: data.data.email,
      password: data.data.password,
      photo: image,
    },
  });

  res.json({ user, message: "Created user" });
};

const logOut = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Looged Out" }).sendStatus(200);
};

export const authController = {
  signIn,
  signUp,
  logOut
};
