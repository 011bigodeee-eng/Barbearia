"use client";
import { motion, useReducedMotion } from "motion/react";
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="route-transition"
      initial={reduce ? false : { opacity: 0.4, clipPath: "inset(0 0 3% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
