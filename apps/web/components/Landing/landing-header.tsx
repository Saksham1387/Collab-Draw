"use client";
import { Menu, Pen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import axios from "axios";
import { httpUrl } from "@/lib/config";
import { deleteCookie } from "cookies-next/client";
import { ModeToggle } from "../toggle-mode";

export const LandingHeader = () => {
  const { user, isloggedIn } = useAuth();
  const router = useRouter();

  const handleLogOut = async () => {
    const res = await axios.post(`${httpUrl}/logout`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      deleteCookie("token");
      router.push("/");
    }
  };
  return (
    <header className="container flex h-16 items-center justify-between py-5 pt-10">
      <div className="flex items-center gap-2">
        <Pen className="h-6 w-6" />
        <span className="text-xl font-bold">Collab Draw</span>
      </div>

      {/* Mobile menu button */}
      <button className="md:hidden">
        <Menu className="h-6 w-6" />
      </button>

      {isloggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div>
              <ModeToggle />
            </div>
            <img
              src={user?.photo}
              className="w-7 h-7 rounded-full cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-sm">
              {user?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link className="text-sm" href={"/dashboard "}>
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  className="text-sm cursor-pointer"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-4">
          <div>
            <ModeToggle />
          </div>
          <Link href="/signup">
            <Button className="cursor-pointer">Get Started</Button>
          </Link>
        </div>
      )}
    </header>
  );
};
