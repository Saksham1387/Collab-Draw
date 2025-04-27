import { Tool } from "@/components/main-canvas";
import { getExistingShapes } from "./getExistingShapes";

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

export class Draw {
  private canvas: HTMLCanvasElement;
  private ws: WebSocket;
  private existingShapes: Shape[] = [];
  private selectedTool: Tool = "rect";
  private ctx: CanvasRenderingContext2D;
  private clicked = false;
  private startX = 0;
  private startY = 0;
  private roomId: string;

  constructor(canvas: HTMLCanvasElement, ws: WebSocket, roomId: string) {
    this.canvas = canvas;
    this.ws = ws;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    console.log(this.existingShapes);
    this.clearCanvas();
  }

  initHandlers() {
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type == "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);

    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(tool: "circle" | "pencil" | "rect") {
    this.selectedTool = tool;
  }

  // @ts-ignore
  mouseDownHandler = (e) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };

  // @ts-ignore

  mouseMoveHandler = (e) => {
    if (this.clicked) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      this.clearCanvas();
      this.ctx.strokeStyle = "rgba(255, 255, 255)";
      const selectedTool = this.selectedTool;
      console.log(selectedTool);
      if (selectedTool === "rect") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = this.startX + radius;
        const centerY = this.startY + radius;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  };


  // @ts-ignore

  mouseUpHandler = (e) => {
    this.clicked = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;

    const selectedTool = this.selectedTool;
    let shape: Shape | null = null;
    if (selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        height,
        width,
      };
    } else if (selectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        radius: radius,
        centerX: this.startX + radius,
        centerY: this.startY + radius,
      };
    }

    if (!shape) {
      return;
    }

    this.existingShapes.push(shape);

    this.ws.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId: this.roomId,
      })
    );
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);

    this.canvas.addEventListener("mouseup", this.mouseUpHandler);

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(17, 17, 17, 1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    console.log(this.existingShapes);
    console.log("printing");
    this.existingShapes.forEach((shape) => {
      console.log(shape);
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "rgba(255,255,255)";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          shape.radius,
          0,
          2 * Math.PI
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }
}
