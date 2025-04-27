import Dashboard from "@/components/dashboard";
import { httpUrl } from "@/lib/config";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
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
