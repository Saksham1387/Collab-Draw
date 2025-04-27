import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { prisma } from "@repo/db/prisma";
import { JWT_SECRET } from "common/config";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "common/types";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.post("/signup", async (req, res): Promise<void> => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  const user = await prisma.user.create({
    data: {
      email: data.data.email,
      password: data.data.password,
    },
  });

  res.json({ user, message: "Created user" });
});

app.post("/signin", async (req, res) => {
  console.log(req.body);
  const data = SigninSchema.safeParse(req.body);
  console.log(data);
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
    res.json({
      message: "Wrong password",
    });
    return;
  }
  if (!user) {
    res.json({
      message: "user does not exsist",
    });
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
});

app.get("/dashboard", async (req, res) => {
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
});

app.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Looged Out" }).sendStatus(200);
});

app.get("/user", middleware, async (req, res) => {
  console.log(req.userId);
  const user = await prisma.user.findFirst({
    where: {
      id: req.userId,
    },
  });

  console.log(user);
  res.json(user).sendStatus(200);
});

app.post("/room", middleware, async (req, res) => {
  console.log("here");
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
});

app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;

  const room = await prisma.room.findFirst({
    where: {
      slug,
    },
  });

  res.json({ room });
});

app.get("/chats/:roomId", middleware, async (req, res) => {
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
});

app.listen(3001);
