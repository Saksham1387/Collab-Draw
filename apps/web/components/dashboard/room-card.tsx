"use client";
import { ArrowUpRight } from "lucide-react";
import { Room } from "@/components/dashboard";
import Image from "next/image";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/format-date";
import { useRouter } from "next/navigation";

interface RoomCardProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => {
  const router = useRouter();

  return (
    <div className="w-[300px] group relative space-y-4 text-white">
      <figure className="group-hover:opacity-90">
        <Image
          className="w-full rounded-lg aspect-square"
          src={room.thumbnail || "/placeholder.svg"}
          width={300}
          height={500}
          alt={room.name}
        />
      </figure>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg text-black dark:text-white">{room.name}</h3>
        </div>

        <div>
          <h3 className="text-xs text-gray-500">
            <span>{formatDate(room.updatedAt)}</span>
          </h3>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          className="w-full cursor-pointer text-black dark:text-white"
          onClick={() => router.push(`/canvas/${room.id}`)}
        >
          <ArrowUpRight className="size-4 me-1" /> Open
        </Button>
      </div>
    </div>
  );
};
