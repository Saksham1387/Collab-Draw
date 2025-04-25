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
      radius: number;
      centerX: number;
      centerY: number;
    };

export const initDraw = async (
  canvas: HTMLCanvasElement,
  roomId: string,
  ws: WebSocket,
  selectedShape: string
) => {
  console.log("fsdjfoisd", ws);
  const ctx = canvas.getContext("2d");

  let existingShape: Shape[] = await getExistingShapes(roomId);

  console.log(existingShape);
  if (!ctx) {
    return;
  }

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    console.log(message);
    if (message.type == "chat") {
      const parsedShape = JSON.parse(message.message);
      console.log(parsedShape);
      existingShape.push(message.message);
      clearCanvas(canvas, existingShape, ctx);
    }
  };

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

    let shape: Shape | null = null;
    if (selectedShape === "rect") {
      shape = {
        type: "rect",
        x: startX,
        y: startY,
        width,
        height,
      };
    } else if (selectedShape === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        radius: radius,
        centerX: startX + width / 2,
        centerY: startY + height / 2,
      };
    }

    if (!shape) {
      return;
    }

    existingShape.push(shape);

    ws.send(
      JSON.stringify({
        roomId,
        type: "chat",
        message: JSON.stringify(shape),
      })
    );
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(canvas, existingShape, ctx);
      ctx.strokeStyle = "rgba(255,255,255)";

      if (selectedShape == "rect") {
        ctx.strokeRect(startX, startY, width, height);
      }

      if (selectedShape == "circle") {
        const centerX = startX + width / 2;
        const centerY = startY + height / 2;
        const radius = Math.max(width, height) / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
      }
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

  console.log(existingShape);
  console.log("printing");
  existingShape.forEach((shape) => {
    console.log(shape);
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    }
  });
}

async function getExistingShapes(roomId: string) {
  console.log("getting existing shapes");
  const res = await axios.get(`${httpUrl}/chats/${roomId}`);
  const messages = res.data.chats;
  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData;
  });

  return shapes;
}
