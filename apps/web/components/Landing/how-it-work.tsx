"use client"
import { motion } from "framer-motion";

export const HowItWorksSection = () => {
  const stepsData = [
    {
      step: 1,
      title: "Create a Room",
      description: "Start a new drawing room in seconds with just a few clicks."
    },
    {
      step: 2,
      title: "Invite Collaborators",
      description: "Share a simple link with your team members to join your drawing session."
    },
    {
      step: 3,
      title: "Draw Together",
      description: "Collaborate in real-time with multiple users drawing simultaneously."
    },
    {
      step: 4,
      title: "Export & Share",
      description: "Download your creations or share them directly from the platform."
    }
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.6 
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      } 
    },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.section
      id="how-it-works"
      className="py-12 md:py-16"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container max-w-4xl mx-auto">
        <motion.h2 
          className="mb-10 text-center text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl"
          variants={titleVariants}
        >
          How It Works
        </motion.h2>
        
        <motion.div 
          className="grid gap-8 md:grid-cols-2"
          variants={containerVariants}
        >
          {stepsData.map((item) => (
            <motion.div 
              key={item.step} 
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "rgba(var(--muted), 0.7)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
              }}
            >
              <motion.div 
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
                variants={circleVariants}
                whileHover="hover"
              >
                {item.step}
              </motion.div>
              <div>
                <motion.h3 
                  className="text-lg font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + item.step * 0.1 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p 
                  className="text-sm text-muted-foreground mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + item.step * 0.1 }}
                >
                  {item.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};