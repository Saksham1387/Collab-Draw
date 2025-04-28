"use client";
import { useEffect, useState } from "react";
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
import { Clock, Pen, Plus } from "lucide-react";
import { DashboardHeader } from "./dashboard-header";
import { SummaryCardSection } from "./dashboard/summary-card-section";
import { DashboardFooter } from "./dashboard/footer";
import { RoomCard } from "./dashboard/room-card";
import axios from "axios";
import { httpUrl } from "@/lib/config";
import { toast } from "sonner";

export type Room = {
  id: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  thumbnail: string;
  adminId: string;
};

export default function Dashboard() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [initalrooms, setInitialroooms] = useState<Room[]>();
  const [totalRooms, setTotalRooms] = useState<number>();
  const [recentlyEditedRooms, setRecentlyEditedRooms] = useState<Room[]>();
  const [rooms, setRooms] = useState(initalrooms);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${httpUrl}/dashboard`, {
          withCredentials: true,
        });
        const dashboard = res.data;

        setInitialroooms(dashboard.rooms);
        setRooms(dashboard.rooms);
        setTotalRooms(dashboard.totalRooms);
        setRecentlyEditedRooms(dashboard.recentlyEditedRooms);
      } catch (err) {
        toast("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;

    console.log("before the call", rooms);
    const res = await axios.post(
      `${httpUrl}/room`,
      {
        name: newRoomName,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res.data.room);
    console.log([res.data.room, ...rooms!]);
    if (res.status === 200) {
      setRooms((prevRooms) => {
        console.log("Adding new room to:", prevRooms);
        return [res.data.room, ...prevRooms!];
      });

      console.log("after the call", rooms);

      toast("Room Created!");
      setNewRoomName("");
      setIsCreateDialogOpen(false);
    } else {
      toast("Error in Creating room");
    }
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
              <Button className="gap-2 bg-blue-500 text-white hover:bg-blue-500/90">
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
                <Button
                  onClick={handleCreateRoom}
                  className="bg-blue-500 text-white hover:bg-blue-500/90"
                >
                  Create Room
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex gap-4 px-10 mb-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-full h-24 bg-muted rounded animate-pulse"
              />
            ))}
          </div>
        ) : (
          <SummaryCardSection
            totalRooms={totalRooms!}
            recentActivityCount={recentlyEditedRooms?.length!}
          />
        )}

        <Tabs defaultValue="all" className="w-full px-10 pb-10">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Rooms</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {initalrooms?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Pen className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No drawing rooms found
                </h3>

                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Room
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {isLoading
                  ? [...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className="rounded-lg border p-4 space-y-2"
                      >
                        <div className="h-40 bg-muted rounded-md animate-pulse" />
                        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                        <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
                      </div>
                    ))
                  : rooms?.map((room, index) => (
                      <RoomCard key={index} room={room} />
                    ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recentlyEditedRooms?.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No recent activity
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    You haven&apos;t worked on any drawing rooms recently
                  </p>
                </div>
              ) : (
                recentlyEditedRooms?.map((room, index) => (
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
