"use client";
import DesignToolbar from "@/components/tool-bar";
import { initDraw } from "@/draw";
import { useRoom } from "@/hooks/useRoom";
import { useEffect, useRef } from "react";

// TODO: Learn about this await thing
export default function ({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const canvasRef = useRef(null);
  const { room } = useRoom(params.slug);

  useEffect(() => {
    if (canvasRef.current) {
        // TODO: Look here
      initDraw(canvasRef.current, room?.id);
    }
  }, [canvasRef]);
  return (
    <div>
      <DesignToolbar />

      <canvas ref={canvasRef} width={1920} height={1080}></canvas>
    </div>
  );
}
