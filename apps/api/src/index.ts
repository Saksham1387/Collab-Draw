import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { prisma } from "@repo/db/prisma";
import { JWT_SECRET } from "common/config";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "common/types";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors())

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

  res.json({
    token: token,
  });
});

app.post("/room", middleware, async (req, res) => {
  console.log("here")
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
      adminId: userId,
    },
  });
  res.json({ room, message: "joined room" });
});

app.get("/room/:slug", async (req,res ) =>{
  const slug = req.params.slug;

  const room  = await prisma.room.findFirst({
    where:{
      slug
    }
  })

  res.json({room})
})

app.get("/chats/:roomId", async (req,res) => {
  const roomId = Number(req.params.roomId);
  const chats = await prisma.chat.findMany({
    where:{
      roomId
    },
    orderBy:{
      id:"desc"
    },
    take:50
  })


  res.json({chats})
})



app.listen(3001);
