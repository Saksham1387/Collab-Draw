"use client";
import { Clientcanvas } from "@/components/clientCanvas";

// TODO: Learn about this await thing
export default async function Page({
  params,
}: {
  params: {
    roomId: string;
  };
}) {
  const roomId = (await params).roomId;

  console.log(roomId)
  return <Clientcanvas roomId={roomId} />;
}
