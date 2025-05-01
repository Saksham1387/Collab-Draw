"use client";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { ArrowLeftToLine, Dot, Radio, Users } from "lucide-react";
import { useWindowSize } from "usehooks-ts";
import { Draw } from "@/draw/draw";
import Loading from "@/app/loading";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ToolBar } from "./Canvas/tool-bar";

export type Tool = "circle" | "rect" | "pencil" | "straight-line" | "text";

export const MainCanvas = ({ roomId }: { roomId: string }) => {
  const { ws, loading: socketLoading } = useSocket();
  const [selectedTool, setSelectedTool] = useState<Tool>("rect");
  const { width = window.innerWidth, height = window.innerHeight } =
    useWindowSize();
  const [draw, setDraw] = useState<Draw>();
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [userCount, setUserCount] = useState(1);

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
    const handleBeforeUnload = () => {
      if (ws && roomId) {
        ws.send(JSON.stringify({ type: "leave_room", roomId }));
      }
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [ws, roomId]);

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
      console.log("room left")
      ws.send(
        JSON.stringify({
          type: "leave_room",
          roomId,
        })
      );

      d.destroy();
    };
  }, [canvasRef, ws, loading, roomId]);

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);

        // Handle the room_users message type
        if (data.type === "room_users" && data.roomId === roomId) {
          setUserCount(data.count);
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    ws.addEventListener("message", handleMessage);

    return () => {
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws, roomId]);

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

      <div className="absolute top-4 left-4 z-20 flex items-center gap-5">
        <Button
          className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-500/90 cursor-pointer shadow-md transition-all duration-200"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          <ArrowLeftToLine className="w-4 h-4" />
          <span>Back to dashboard</span>
        </Button>

        <div className="bg-blue-500 px-4 py-2 rounded-lg flex items-center gap-2 text-white shadow-md transition-all hover:bg-blue-500/90 cursor-default">
        <Radio className="text-green-800 w-5 h-5"/>
          <Users className="w-4 h-4 text-blue-200" />
          <span className="font-medium">{userCount}</span>
        </div>
      </div>

      <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  );
};
