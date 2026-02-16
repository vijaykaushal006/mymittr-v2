"use client";

import { motion } from "framer-motion";
import React from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  // ✅ Explicitly allow both x and y
  let initial: { opacity: number; x?: number; y?: number } = {
    opacity: 0,
    y: 20,
  };

  if (direction === "down") initial = { opacity: 0, y: -20 };
  if (direction === "left") initial = { opacity: 0, x: 40 };
  if (direction === "right") initial = { opacity: 0, x: -40 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}