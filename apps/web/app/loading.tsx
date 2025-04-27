"use client";
import { motion } from "framer-motion";
import { Pen } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background dark:bg-[#111111]">
      <div className="flex flex-col items-center justify-center gap-8">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Pen className="h-8 w-8 text-primary dark:text-white" />
          </motion.div>
          <motion.span
            className="text-3xl font-bold text-foreground dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Collab Draw
          </motion.span>
        </motion.div>

        <motion.div
          className="relative h-2 w-64 overflow-hidden rounded-full bg-muted dark:bg-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary dark:bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className="flex gap-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="h-4 w-4 rounded-full bg-primary dark:bg-blue-500"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          className="mt-4 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        ></motion.div>
      </div>
    </div>
  );
}
