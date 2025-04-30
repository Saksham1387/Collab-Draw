import express from "express";
import authRouter from "./routes/authRoute";
import chatsRouter from "./routes/chatsRoute";
import roomRouter from "./routes/roomRoute";
import userRouter from "./routes/userRoute";
import cors from "cors";
import dashboardRouter from "./routes/dashboardRoute";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/chats", chatsRouter);
app.use("/room", roomRouter);
app.use("/user", userRouter);
app.use("/dashboard", dashboardRouter);
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
