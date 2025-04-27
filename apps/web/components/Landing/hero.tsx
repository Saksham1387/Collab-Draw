import Image from "next/image";
import { Button } from "../ui/button";
import { Users, Zap } from "lucide-react";
export const HeroSection = () => {
  return (
    <section className="container flex flex-col items-center justify-center gap-4 py-8 text-center md:py-16 lg:py-24">
      <div className="space-y-4 md:space-y-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          Collaborative drawing,
          <span className="block text-primary">real-time creativity</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-base text-muted-foreground md:text-lg lg:text-xl">
          Create, share, and collaborate on drawings in real-time with our
          intuitive canvas tools and seamless multiplayer experience
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button size="lg" className="gap-2">
          <Zap className="h-4 w-4" />
          Start Drawing Now
        </Button>
        <Button size="lg" variant="outline" className="gap-2">
          <Users className="h-4 w-4" />
          Join a Session
        </Button>
      </div>

      {/* Hero image/screenshot */}
      <div className="mt-8 w-full max-w-5xl rounded-lg border bg-background p-2 shadow-lg md:mt-12">
        <div className="flex items-center gap-1 border-b pb-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto flex items-center rounded-md border px-2 py-1 text-xs text-muted-foreground">
            <span className="truncate">collab-draw.app/session/12345</span>
          </div>
        </div>
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/placeholder.svg?height=720&width=1280"
            alt="Collab Draw Interface"
            fill
            className="rounded-md object-cover"
            priority
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 text-sm backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>3 collaborators online</span>
          </div>
        </div>
      </div>
    </section>
  );
};
