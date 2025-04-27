"use client"

import { motion } from "framer-motion"
import { Pen } from 'lucide-react'
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Loading() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background dark:bg-black">
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
        >
          <DrawingAnimation />
          <p className="mt-8 text-muted-foreground dark:text-gray-400">Setting up your canvas...</p>
        </motion.div>
      </div>
    </div>
  )
}

function DrawingAnimation() {
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 0.5 },
        opacity: { duration: 0.5 },
      },
    },
  }

  return (
    <div className="relative h-32 w-32">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Drawing canvas outline */}
        <motion.rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="4"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Animated drawing paths */}
        <motion.path
          d="M30 30 Q50 20, 70 30 T90 50"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary dark:text-white"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M20 50 Q40 70, 60 50 T80 70"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary dark:text-white"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        />
        <motion.path
          d="M30 70 L70 30"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary dark:text-white"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        />

        {/* Animated cursor */}
        <motion.circle
          cx="50"
          cy="50"
          r="3"
          fill="currentColor"
          className="text-primary dark:text-white"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </svg>
    </div>
  )
}