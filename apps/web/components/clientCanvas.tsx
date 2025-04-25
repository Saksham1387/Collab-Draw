"use client";
import { useSocket } from "@/hooks/useSocket";
import { MainCanvas } from "./main-canvas";

interface ClientcanvasProps {
  roomId: string;
}
export const Clientcanvas = ({ roomId }: ClientcanvasProps) => {

  return <MainCanvas roomId={roomId}  />;
};
