"use client";
import { useState } from "react";
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
import { httpUrl } from "@/lib/config";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRoom } from "@/mutations/createRoom";

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
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: () =>
      fetch(`${httpUrl}/dashboard`, {
        credentials: "include",
      }).then((res) => res.json()),

    staleTime: 1000 * 60 * 5,
  });

  if (error) {
    console.log(error);
    toast("Error Fetching data");
  }

  const mutation = useMutation({
    mutationFn: createRoom,
    onSuccess: (data) => {
      console.log("User created successfully:", data);
      setNewRoomName("");
      setIsCreateDialogOpen(false);
      toast("Room Created!");
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
    },
    onError: (error) => {
      toast("Failed to create room: " + (error?.message || "Unknown error"));
    },
  });

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) {
      toast("Please enter a room name");
      return;
    }
    mutation.mutate(newRoomName);
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
                  {mutation.isSuccess ? "Room Created" : "Create Room"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {isPending ? (
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
            totalRooms={data.totalRooms!}
            recentActivityCount={data.recentlyEditedRooms?.length!}
          />
        )}

        <Tabs defaultValue="all" className="w-full px-10 pb-10">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Rooms</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {data?.rooms?.length === 0 ? (
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
                {isPending
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
                  : data.rooms?.map((room: Room, index: number) => (
                      <RoomCard key={index} room={room} />
                    ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data?.recentlyEditedRooms?.length === 0 ? (
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
                data?.recentlyEditedRooms?.map((room: Room, index: number) => (
                  <RoomCard key={index} room={room} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <DashboardFooter />
    </div>
  );
}
