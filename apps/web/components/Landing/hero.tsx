"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export const HeroSection = () => {
  const router = useRouter();
  const { isloggedIn } = useAuth();

  return (
    <section className="container flex flex-col items-center justify-center gap-4 py-8 text-center md:py-16 lg:py-24">
      <motion.div
        className="space-y-4 md:space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Collaborative drawing,
          </motion.span>
          <motion.span
            className="block text-blue-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            real-time creativity
          </motion.span>
        </h1>
        <motion.p
          className="mx-auto max-w-[700px] text-base text-muted-foreground md:text-lg lg:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Create, share, and collaborate on drawings in real-time with our
          intuitive canvas tools and seamless multiplayer experience
        </motion.p>
      </motion.div>

      {isloggedIn ? (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            className="gap-2"
            onClick={() => router.push("/dashboard")}
          >
            Go to dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="gap-2"
              onClick={() => router.push("/signup")}
            >
              <Zap className="h-4 w-4" />
              Start Drawing Now
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={() => router.push("/signin")}
            >
              <Users className="h-4 w-4" />
              Join a Session
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Hero image/screenshot */}
      <motion.div
        className="mt-8 w-full max-w-5xl rounded-lg border bg-background p-2 shadow-lg md:mt-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex items-center gap-1 border-b pb-2">
          <div className="flex gap-1.5">
            <motion.div
              className="h-3 w-3 rounded-full bg-red-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.4 }}
            ></motion.div>
            <motion.div
              className="h-3 w-3 rounded-full bg-yellow-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.5 }}
            ></motion.div>
            <motion.div
              className="h-3 w-3 rounded-full bg-green-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.6 }}
            ></motion.div>
          </div>
          <motion.div
            className="mx-auto flex items-center rounded-md border px-2 py-1 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <span className="truncate">collab-draw.app/session/12345</span>
          </motion.div>
        </div>
        <div className="relative aspect-[16/9] w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="w-full h-full"
          >
            <Image
              src="/landing-image.png"
              alt="Collab Draw Interface"
              fill
              className="rounded-md object-cover"
              priority
            />
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 text-sm backdrop-blur-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            <motion.div
              className="h-2 w-2 rounded-full bg-green-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            ></motion.div>
            <span>3 collaborators online</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
