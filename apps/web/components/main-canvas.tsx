"use client";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import {
  ArrowLeftToLine,
  Circle,
  Minus,
  Pencil,
  Share,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWindowSize } from "usehooks-ts";
import { Draw } from "@/draw/draw";
import Loading from "@/app/loading";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export type Tool = "circle" | "rect" | "pencil" | "straight-line";

export const MainCanvas = ({ roomId }: { roomId: string }) => {
  const { ws, loading: socketLoading } = useSocket();
  const [selectedTool, setSelectedTool] = useState<Tool>("rect");
  const { width = window.innerWidth, height = window.innerHeight } =
    useWindowSize();
  const [draw, setDraw] = useState<Draw>();
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    draw?.setTool(selectedTool);
  }, [selectedTool, draw]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    if (!ws || loading || !canvasRef.current || !draw) return;

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
    { id: "pencil", icon: Pencil, label: "Pencil" },
    { id: "straight-line", icon: Minus, label: "straight-line" },
  ];

  if (loading || socketLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-hidden bg-[#111111] relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="bg-[#111111]"
      ></canvas>

      <div className="absolute top-4 left-4 z-20">
        <Button
          className="flex items-center gap-2 bg-indigo-500 text-white"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          <ArrowLeftToLine className="w-4 h-4" />
          <span>Back to dashboard</span>
        </Button>
      </div>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center space-x-1 bg-white rounded-lg shadow-lg p-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={cn(
                "p-2 rounded-md transition-all focus:outline-none",
                selectedTool === tool.id
                  ? "bg-indigo-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
              onClick={() => setSelectedTool(tool.id as Tool)}
              title={tool.label}
              aria-label={tool.label}
            >
              <tool.icon className="w-5 h-5" />
            </button>
          ))}

          <div className="border-l-2 border-black">
            <div className="pl-2">
              <button className="text-white p-2 rounded-lg bg-indigo-500 pl-2 cursor-pointer">
                <div className="flex flex-row gap-3 items-center justify-center">
                  Share
                  <Share className="w-6 h-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
