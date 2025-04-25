"use client";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "@/draw";
import { useSocket } from "@/hooks/useSocket";
import { Circle, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWindowSize } from "usehooks-ts";

export const MainCanvas = ({ roomId }: { roomId: string }) => {
  const { ws, loading } = useSocket();
  const [selectedTool, setSelectedTool] = useState("rect");
  const { width = window.innerWidth, height = window.innerHeight } = useWindowSize();
  const canvasRef = useRef(null);
  useEffect(() => {
    ws?.send(
      JSON.stringify({
        type: "join_room",
        roomId,
      })
    );
    if (canvasRef.current) {
      if (ws) {
        initDraw(canvasRef.current, roomId, ws!, selectedTool);
      }
    }
  }, [canvasRef, ws, roomId, selectedTool]);

  const tools = [
    { id: "rect", icon: Square, label: "Rectangle" },
    { id: "circle", icon: Circle, label: "Circle" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className=" bg-white"
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
              onClick={() => setSelectedTool(tool.id)}
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
