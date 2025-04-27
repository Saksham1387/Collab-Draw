import Link from "next/link";
import { Pen, Settings, LogOut, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ModeToggle } from "./toggle-mode";
import { useAuth } from "@/hooks/useAuth";

export const DashboardHeader = () => {
  const {user ,isloggedIn} = useAuth();

  return (
    <header className="border-b w-full">
    <div className="flex h-16 w-full items-center justify-between px-10 py-4">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Pen className="h-6 w-6" />
          <span className="text-xl font-bold">Collab Draw</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle/>
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            className="pl-8"
            value={"dsf"}
            onChange={(e) => {
              console.log("fsdf");
            }}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photo} alt="User" />
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
  );
};
