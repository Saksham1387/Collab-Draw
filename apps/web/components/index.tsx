export const index = () => {
     return (

        <div className="flex w-full flex-col items-stretch">
<DashboardHeader />
<main className="flex py-6">
  <div className="container">

    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Rooms</TabsTrigger>
        <TabsTrigger value="recent">Recent</TabsTrigger>
        <TabsTrigger value="starred">Starred</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        {filteredRooms.length === 0 ? (
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
            {filteredRooms.map((room) => (
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
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="recent" className="space-y-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentRooms.length === 0 ? (
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
            recentRooms.map((room) => (
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
      </TabsContent>

      <TabsContent value="starred" className="space-y-4">
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
      </TabsContent>
    </Tabs>
  </div>


</main>

</div>

     )
}