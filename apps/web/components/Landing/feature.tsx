"use client"

import { Pen, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const FeatureSection = () => {
  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Icon animation variants
  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.section
      id="features"
      className="py-12 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.h2
          className="mb-8 text-center text-2xl font-bold tracking-tight md:mb-12 md:text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Why choose Collab Draw?
        </motion.h2>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Feature 1 */}
          <motion.div
            className="rounded-lg bg-background p-6 shadow-sm"
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            }}
          >
            <motion.div
              className="mb-4 w-fit rounded-full bg-primary/10 p-3"
              variants={iconVariants}
              whileHover="hover"
            >
              <Zap className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="mb-2 text-xl font-bold">Real-time Collaboration</h3>
            <p className="text-muted-foreground">
              Draw together with your team in real-time, no matter where they
              are located.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="rounded-lg bg-background p-6 shadow-sm"
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            }}
          >
            <motion.div
              className="mb-4 w-fit rounded-full bg-primary/10 p-3"
              variants={iconVariants}
              whileHover="hover"
            >
              <Pen className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="mb-2 text-xl font-bold">Intuitive Tools</h3>
            <p className="text-muted-foreground">
              Powerful yet simple drawing tools that anyone can master in
              minutes.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="rounded-lg bg-background p-6 shadow-sm sm:col-span-2 md:col-span-1"
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            }}
          >
            <motion.div
              className="mb-4 w-fit rounded-full bg-primary/10 p-3"
              variants={iconVariants}
              whileHover="hover"
            >
              <Users className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="mb-2 text-xl font-bold">Team Management</h3>
            <p className="text-muted-foreground">
              Create teams, manage permissions, and organize your projects
              efficiently.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};