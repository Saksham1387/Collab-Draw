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
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-screen items-center flex  justify-center pt-5"
    >
      <header className="container flex h-16 items-center justify-between bg-neutral-900 rounded-2xl py-10 px-5 ">
        <div className="flex items-center gap-2">
          <Pen className="h-6 w-6 text-blue-500" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-xl font-bold"
          >
            Collab Draw
          </motion.span>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>

        {isloggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row gap-5">
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
          <div className="flex items-center gap-5 flex-row">
            <Link href="/signup">
              <Button className="cursor-pointer">Get Started</Button>
            </Link>
          </div>
        )}
      </header>
    </motion.div>
  );
};
