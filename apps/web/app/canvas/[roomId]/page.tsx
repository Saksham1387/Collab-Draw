import { Clientcanvas } from "@/components/clientCanvas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// TODO: Learn about this await thing
export default async function Page({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const roomId = (await params).roomId;

  if (!token) {
    redirect("/signin");
  }
  return <Clientcanvas roomId={roomId} />;
}
