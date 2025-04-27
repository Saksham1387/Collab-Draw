import { Clientcanvas } from "@/components/clientCanvas";
import { useAuthServer } from "@/hooks/useAuthServer";
import { redirect } from "next/navigation";

// TODO: Learn about this await thing
export default async function Page({
  params,
}: {
  params: {
    roomId: string;
  };
}) {
  const { isloggedIn } = await useAuthServer();

  const roomId = (await params).roomId;

  if(!isloggedIn){
    redirect("/signin")
  }
  return <Clientcanvas roomId={roomId} />;
}
