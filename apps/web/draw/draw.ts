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

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  mouseDownHandler = (e: MouseEvent) => {
    this.clicked = true;
    
    // Get the correct mouse coordinates relative to the canvas
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.startX = x;
    this.startY = y;
    
    if (this.selectedTool === "pencil") {
      // Start a new pencil stroke
      this.currentPencilPoints = [{ x, y }];
      
      // Set initial line style for pencil
      this.ctx.strokeStyle = "rgba(255, 255, 255)";
      this.ctx.lineWidth = this.pencilLineWidth;
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
    }
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (!this.clicked) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    if (this.selectedTool === "pencil") {
      // Add the new point to our pencil stroke
      this.currentPencilPoints.push({ x: mouseX, y: mouseY });
      
      // Draw the line segment
      this.ctx.beginPath();
      const prevPoint = this.currentPencilPoints[this.currentPencilPoints.length - 2];
      this.ctx.moveTo(prevPoint.x, prevPoint.y);
      this.ctx.lineTo(mouseX, mouseY);
      this.ctx.stroke();
    } else {
      // For other shapes, clear and redraw preview
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
    } else if (this.selectedTool === "pencil" && this.currentPencilPoints.length > 1) {
      // Save the pencil stroke
      shape = {
        type: "pencil",
        points: this.currentPencilPoints,
        lineWidth: this.pencilLineWidth
      };
      // Reset current points for next stroke
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
    
    this.clearCanvas(); // Redraw to ensure everything is rendered properly
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

    // Draw all the saved shapes
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
        // Draw pencil strokes
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
        
        // Reset line width for other shapes
        this.ctx.lineWidth = 1;
      }
    });
  }
}