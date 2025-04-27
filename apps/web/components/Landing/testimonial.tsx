"use client"
import { motion } from "framer-motion";

export const TestimonialSection = () => {
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

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const starContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 15
      }
    }
  };

  const testimonials = [
    {
      quote: "Collab Draw has transformed how our design team works together. The real-time collaboration is seamless, and it's so intuitive that everyone picked it up immediately.",
      name: "Sarah Johnson",
      title: "Design Director, CreativeHub"
    },
    {
      quote: "As a remote team, we needed a tool that would help us brainstorm visually. Collab Draw is exactly what we needed - it feels like we're all in the same room sketching on a whiteboard.",
      name: "Michael Chen",
      title: "Product Manager, TechInnovate"
    },
    {
      quote: "I use Collab Draw with my students for interactive lessons. It's been a game-changer for keeping them engaged and collaborating on projects, even in a virtual classroom setting.",
      name: "Emily Rodriguez",
      title: "Art Teacher, Westlake Academy"
    }
  ];

  return (
    <motion.section
      id="testimonials"
      className="py-12 md:py-16"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <motion.h2
          className="mb-8 text-center text-2xl font-bold tracking-tight md:mb-12 md:text-3xl lg:text-4xl"
          variants={headingVariants}
        >
          What Our Users Say
        </motion.h2>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
          variants={cardContainerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className={`rounded-lg border bg-background p-6 shadow-sm ${
                index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
              variants={cardVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <motion.div
                className="mb-4 flex"
                variants={starContainerVariants}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.svg
                    key={star}
                    className="h-5 w-5 fill-primary"
                    viewBox="0 0 20 20"
                    variants={starVariants}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </motion.div>
              <motion.p
                className="mb-4 italic text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
              >
                &quot;{testimonial.quote}&quot;
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
              >
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.title}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};