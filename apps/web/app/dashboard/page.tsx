import Dashboard from "@/components/dashboard";
import { useAuthServer } from "@/hooks/useAuthServer";
import { httpUrl } from "@/lib/config";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function Page() {
  const { isloggedIn } = await useAuthServer();
  if (!isloggedIn) {
    redirect("/signin");
  }

  const res = await axios.get(`${httpUrl}/dashboard`, {
    withCredentials: true,
  });
  const dashboard = res.data;
  console.log(dashboard);
  return (
    <Dashboard
      initalrooms={dashboard.rooms}
      totalRooms={dashboard.totalRooms}
      recentlyEditedRooms={dashboard.recentlyEditedRooms}
    />
  );
}
