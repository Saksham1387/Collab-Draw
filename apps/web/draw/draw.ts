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
    }
  | {
      type: "straight-line";
      x: number;
      y: number;
      endX: number;
      endY: number;
    }
  | {
      type: "pencil";
      points: Array<{ x: number; y: number }>;
      lineWidth: number;
    }
  | {
      type: "text";
      x: number;
      y: number;
      content: string;
      fontSize: number;
      fontFamily: string;
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
  private currentPencilPoints: Array<{ x: number; y: number }> = [];
  private pencilLineWidth: number = 2;
  private isTypingText = false;
  private currentTextContent = "";
  private textFontSize = 20;
  private textFontFamily = "Arial";
  private textInput: HTMLInputElement | null = null;

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
    if (this.textInput) {
      document.body.removeChild(this.textInput);
      this.textInput = null;
    }
  }

  setTextFontSize(size: number) {
    this.textFontSize = size;
  }

  setTextFontFamily(fontFamily: string) {
    this.textFontFamily = fontFamily;
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
    if (tool !== "text" && this.textInput) {
      document.body.removeChild(this.textInput);
      this.textInput = null;
    }
  }

  mouseDownHandler = (e: MouseEvent) => {
    this.clicked = true;

    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.startX = x;
    this.startY = y;

    if (this.selectedTool === "pencil") {
      this.currentPencilPoints = [{ x, y }];

      this.ctx.strokeStyle = "rgba(255, 255, 255)";
      this.ctx.lineWidth = this.pencilLineWidth;
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
    } else if (this.selectedTool === "text") {
      this.isTypingText = true;

      if (this.textInput) {
        document.body.removeChild(this.textInput);
      }

      this.textInput = document.createElement("input");
      this.textInput.type = "text";
      this.textInput.style.position = "absolute";
      this.textInput.style.left = `${e.clientX}px`;
      this.textInput.style.top = `${e.clientY}px`;
      this.textInput.style.background = "transparent";
      this.textInput.style.color = "white";
      this.textInput.style.border = "1px solid white";
      this.textInput.style.outline = "none";
      this.textInput.style.fontSize = `${this.textFontSize}px`;
      this.textInput.style.fontFamily = this.textFontFamily;
      this.textInput.style.minWidth = "100px";
      this.textInput.style.zIndex = "1000";

      this.textInput.addEventListener("keydown", this.handleTextInputKeyDown);

      document.body.appendChild(this.textInput);
      this.textInput.focus();
    }
  };

  handleTextInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && this.textInput) {
      // Commit the text when Enter is pressed
      const textContent = this.textInput.value;

      if (textContent.trim() !== "") {
        const shape: Shape = {
          type: "text",
          x: this.startX,
          y: this.startY,
          content: textContent,
          fontSize: this.textFontSize,
          fontFamily: this.textFontFamily,
        };

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
      }

      // Clean up
      document.body.removeChild(this.textInput);
      this.textInput = null;
      this.isTypingText = false;
      this.clearCanvas();
    } else if (e.key === "Escape" && this.textInput) {
      // Cancel on Escape
      document.body.removeChild(this.textInput);
      this.textInput = null;
      this.isTypingText = false;
    }
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (!this.clicked) return;

    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (this.selectedTool === "pencil") {
      this.currentPencilPoints.push({ x: mouseX, y: mouseY });

      this.ctx.beginPath();
      const prevPoint =
        this.currentPencilPoints[this.currentPencilPoints.length - 2];
      this.ctx.moveTo(prevPoint.x, prevPoint.y);
      this.ctx.lineTo(mouseX, mouseY);
      this.ctx.stroke();
    } else {
      const width = mouseX - this.startX;
      const height = mouseY - this.startY;

      this.clearCanvas();
      this.ctx.strokeStyle = "rgba(255, 255, 255)";

      if (this.selectedTool === "rect") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (this.selectedTool === "circle") {
        const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
        const centerX = this.startX + width / 2;
        const centerY = this.startY + height / 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (this.selectedTool === "straight-line") {
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(mouseX, mouseY);
        this.ctx.stroke();
      }
    }
  };

  mouseUpHandler = (e: MouseEvent) => {
    if (!this.clicked || this.selectedTool === "text") return;
    if (!this.clicked) return;
    this.clicked = false;

    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let shape: Shape | null = null;

    if (this.selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width: mouseX - this.startX,
        height: mouseY - this.startY,
      };
    } else if (this.selectedTool === "circle") {
      const width = mouseX - this.startX;
      const height = mouseY - this.startY;
      const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
      shape = {
        type: "circle",
        radius,
        centerX: this.startX + width / 2,
        centerY: this.startY + height / 2,
      };
    } else if (this.selectedTool === "straight-line") {
      shape = {
        type: "straight-line",
        x: this.startX,
        y: this.startY,
        endX: mouseX,
        endY: mouseY,
      };
    } else if (
      this.selectedTool === "pencil" &&
      this.currentPencilPoints.length > 1
    ) {
      shape = {
        type: "pencil",
        points: this.currentPencilPoints,
        lineWidth: this.pencilLineWidth,
      };

      this.currentPencilPoints = [];
    }

    if (shape) {
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
    }

    this.clearCanvas();
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

    this.existingShapes.forEach((shape) => {
      this.ctx.strokeStyle = "rgba(255,255,255)";

      if (shape.type === "rect") {
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
      } else if (shape.type === "straight-line") {
        this.ctx.beginPath();
        this.ctx.moveTo(shape.x, shape.y);
        this.ctx.lineTo(shape.endX, shape.endY);
        this.ctx.stroke();
      } else if (shape.type === "pencil") {
        if (shape.points.length < 2) return;

        this.ctx.lineWidth = shape.lineWidth || 2;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";

        this.ctx.beginPath();
        this.ctx.moveTo(shape.points[0].x, shape.points[0].y);

        for (let i = 1; i < shape.points.length; i++) {
          this.ctx.lineTo(shape.points[i].x, shape.points[i].y);
        }

        this.ctx.stroke();

        this.ctx.lineWidth = 1;
      } else if (shape.type === "text") {
        // Draw text
        this.ctx.fillStyle = "rgba(255,255,255)";
        this.ctx.font = `${shape.fontSize}px ${shape.fontFamily}`;
        this.ctx.fillText(shape.content, shape.x, shape.y);
      }
    });
  }
}
