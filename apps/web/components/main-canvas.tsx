"use client";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { Circle, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWindowSize } from "usehooks-ts";
import { Draw } from "@/draw/draw";
import Loading from "@/app/loading";

export type Tool = "circle" | "rect" | "pencil";

export const MainCanvas = ({ roomId }: { roomId: string }) => {
  const { ws, loading: socketLoading } = useSocket();
  const [selectedTool, setSelectedTool] = useState<Tool>("rect");
  const { width = window.innerWidth, height = window.innerHeight } = useWindowSize();
  const [draw, setDraw] = useState<Draw>();
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  console.log(ws);
  
  useEffect(() => {
    draw?.setTool(selectedTool);
  }, [selectedTool, draw]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize Draw instance when socket and canvas are ready
  useEffect(() => {
    if (!ws || loading || !canvasRef.current) return;

    ws.send(
      JSON.stringify({
        type: "join_room",
        roomId,
      })
    );

    const d = new Draw(canvasRef.current, ws, roomId);
    setDraw(d);

    return () => {
      d.destroy();
    };
  }, [canvasRef, ws, loading, roomId]);

  // Handle window resize and reinitialize the canvas
  useEffect(() => {
    if (!ws || loading || !canvasRef.current || !draw) return;
    
    // Destroy the previous instance and create a new one with updated dimensions
    draw.destroy();
    const newDraw = new Draw(canvasRef.current, ws, roomId);
    setDraw(newDraw);
    newDraw.setTool(selectedTool);
    
    return () => {
      newDraw.destroy();
    };
  }, [width, height]);

  const tools = [
    { id: "rect", icon: Square, label: "Rectangle" },
    { id: "circle", icon: Circle, label: "Circle" },
  ];

  if (loading || socketLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-hidden bg-[#111111]">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="bg-[#111111]"
      ></canvas>

      {/* Toolbar positioned at the top center */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center space-x-1 bg-white rounded-lg shadow-lg p-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={cn(
                "p-2 rounded-md transition-all focus:outline-none",
                selectedTool === tool.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
              onClick={() => setSelectedTool(tool.id as Tool)}
              title={tool.label}
              aria-label={tool.label}
            >
              <tool.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>


      
    </div>
  );
};
