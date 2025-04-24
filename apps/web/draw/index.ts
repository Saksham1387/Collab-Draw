import { httpUrl } from "@/lib/config";
import axios from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      x: number;
      y: number;
      width: number;
      height: number;
    };

export const initDraw = async (canvas: HTMLCanvasElement,roomId:string) => {
  const ctx = canvas.getContext("2d");

  let existingShape: Shape[] = await getExistingShapes(roomId);

  if (!ctx) {
    return;
  }

  clearCanvas(canvas, existingShape, ctx);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;

    const width = e.clientX - startX;
    const height = e.clientY - startY;

    existingShape.push({
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    });
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(canvas, existingShape, ctx);
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
};

function clearCanvas(
  canvas: HTMLCanvasElement,
  existingShape: Shape[],
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShape.map((shape) => {
    if (shape.type == "rect") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${httpUrl}/chats/${roomId}`);
  const messages = res.data.chats;
  // @ts-ignore
  const shapes = messages.map((x) => {
    const messageData = JSON.stringify(x.message);
    return messageData;
  });

  return shapes
}
