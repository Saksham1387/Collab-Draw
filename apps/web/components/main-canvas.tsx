"use client";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { ArrowLeftToLine } from "lucide-react";
import { useWindowSize } from "usehooks-ts";
import { Draw } from "@/draw/draw";
import Loading from "@/app/loading";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ToolBar } from "./Canvas/tool-bar";

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
          className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-500/90 cursor-pointer"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          <ArrowLeftToLine className="w-4 h-4" />
          <span>Back to dashboard</span>
        </Button>
      </div>

      <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  );
};
