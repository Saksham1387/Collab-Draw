import Dashboard from "@/components/dashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("/signin");
  }

  return <Dashboard />;
}
