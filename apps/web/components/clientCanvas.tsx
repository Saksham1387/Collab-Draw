"use client";
import { MainCanvas } from "./main-canvas";

interface ClientcanvasProps {
  roomId: string;
}
export const Clientcanvas = ({ roomId }: ClientcanvasProps) => {

  return <MainCanvas roomId={roomId}  />;
};
