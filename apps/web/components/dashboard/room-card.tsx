"use client";
import { ArrowUpRight, Clock, MoreHorizontal } from "lucide-react";
import { Room } from "@/components/dashboard";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/format-date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface RoomCardProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => {
  const router = useRouter();

  return (
    <Card key={room.id} className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={room.thumbnail || "/placeholder.svg"}
          alt={room.name}
          fill
          className="object-cover"
        />
        {/* <button
                        className={`absolute top-2 right-2 p-1 rounded-full ${
                          room.starred
                            ? "text-yellow-400 bg-black/20"
                            : "text-gray-400 bg-black/10"
                        }`}
                        onClick={() => toggleStar(room.id)}
                      >
                        <Star
                          className="h-5 w-5"
                          fill={room.starred ? "currentColor" : "none"}
                        />
                      </button> */}
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{room.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="flex items-center gap-1 mt-1">
          <Clock className="h-3 w-3" />
          <span>{formatDate(room.updatedAt)}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-2 flex justify-between">
        {/* <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {room.collaborators} collaborators
                        </span>
                      </div> */}
        <Button
          size="sm"
          className="gap-1"
          onClick={() => {
            router.push(`/canvas/${room.id}`);
          }}
        >
          <ArrowUpRight className="h-3 w-3" />
          Open
        </Button>
      </CardFooter>
    </Card>
  );
};
