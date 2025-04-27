"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Pen,
  Plus,
  Search,
  Clock,
  Users,
  Star,
  MoreHorizontal,
  Calendar,
  ArrowUpRight,
  Settings,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardHeader } from "./dashboard-header";
import { SummaryCardSection } from "./dashboard/summary-card-section";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DashboardFooter } from "./dashboard/footer";
import { formatDate } from "@/lib/format-date";
import { useRouter } from "next/navigation";
import { RoomCard } from "./dashboard/room-card";
import axios from "axios";
import { httpUrl } from "@/lib/config";
import { toast } from "sonner";

// Mock data for rooms
const mockRooms = [
  {
    id: "room-1",
    name: "Product Wireframe",
    lastEdited: "2 hours ago",
    collaborators: 5,
    thumbnail: "/placeholder.svg?height=200&width=300",
    starred: true,
  },
  {
    id: "room-2",
    name: "Marketing Campaign Sketch",
    lastEdited: "Yesterday",
    collaborators: 3,
    thumbnail: "/placeholder.svg?height=200&width=300",
    starred: false,
  },
  {
    id: "room-3",
    name: "UI Design Elements",
    lastEdited: "3 days ago",
    collaborators: 2,
    thumbnail: "/placeholder.svg?height=200&width=300",
    starred: true,
  },
  {
    id: "room-4",
    name: "Team Brainstorming",
    lastEdited: "1 week ago",
    collaborators: 8,
    thumbnail: "/placeholder.svg?height=200&width=300",
    starred: false,
  },
  {
    id: "room-5",
    name: "Project Roadmap",
    lastEdited: "2 weeks ago",
    collaborators: 4,
    thumbnail: "/placeholder.svg?height=200&width=300",
    starred: false,
  },
  {
    id: "room-6",
    name: "Website Mockup",
    lastEdited: "1 month ago",
    collaborators: 2,
    thumbnail: "/placeholder.svg?height=200&width=300",
    starred: false,
  },
];

export type Room = {
  id: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  thumbnail: string;
  adminId: string;
};

interface DashboardProps {
  initalrooms: Room[];
  totalRooms: number;
  recentlyEditedRooms: Room[];
}

export default function Dashboard({
  initalrooms,
  totalRooms,
  recentlyEditedRooms,
}: DashboardProps) {
  const [rooms, setRooms] = useState(initalrooms);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const starredRooms = filteredRooms.filter((room) => room.starred);

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;

    console.log("before the call",rooms)
    const res = await axios.post(
      `${httpUrl}/room`,
      {
        name: newRoomName,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res.data.room)
    console.log([res.data.room, ...rooms])
    if (res.status === 200) {
      setRooms(prevRooms => {
        console.log("Adding new room to:", prevRooms);
        return [res.data.room, ...prevRooms];
      });

    console.log("after the call",rooms)


      toast("Room Created!");
      setNewRoomName("");
      setIsCreateDialogOpen(false);
    } else {
      toast("Error in Creating room");
    }
  };

  const toggleStar = (roomId: any) => {
    // setRooms(
    //   rooms.map((room) =>
    //     room.id === roomId ? { ...room, starred: !room.starred } : room
    //   )
    // );
  };

  return (
    <div>
      <DashboardHeader />
      <main className="flex flex-col gap-y-2 pt-5">
        <div className="flex items-center justify-between mb-6 px-10">
          <h1 className="text-3xl font-bold">Your Drawing Rooms</h1>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Room
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Drawing Room</DialogTitle>
                <DialogDescription>
                  Give your new drawing room a name to get started.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Room Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Project Wireframe"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateRoom}>Create Room</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <SummaryCardSection
          totalRooms={totalRooms}
          recentActivityCount={recentlyEditedRooms.length}
        />

        <Tabs defaultValue="all" className="w-full px-10 pb-10">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Rooms</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {rooms.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Pen className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No drawing rooms found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try a different search term"
                    : "Create your first drawing room to get started"}
                </p>
                {!searchQuery && (
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Room
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room, index) => (
                  <RoomCard key={index} room={room} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentlyEditedRooms.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No recent activity
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't worked on any drawing rooms recently
                  </p>
                </div>
              ) : (
                recentlyEditedRooms.map((room, index) => (
                  <RoomCard key={index} room={room} />
                ))
              )}
            </div>
          </TabsContent>

          {/* <TabsContent value="starred" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {starredRooms.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Star className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No starred rooms
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Star your important rooms to find them quickly
                  </p>
                </div>
              ) : (
                starredRooms.map((room) => (
                  <Card key={room.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={room.thumbnail || "/placeholder.svg"}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                      <button
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
                      </button>
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
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
                        <span>{room.lastEdited}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2 flex justify-between">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {room.collaborators} collaborators
                        </span>
                      </div>
                      <Button size="sm" className="gap-1">
                        <ArrowUpRight className="h-3 w-3" />
                        Open
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent> */}
        </Tabs>
      </main>

      <DashboardFooter />
    </div>
  );
}
