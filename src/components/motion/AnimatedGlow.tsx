"use client";

import { motion } from "framer-motion";

const PALETTES = {
  hero: [
    "radial-gradient(circle, rgba(56,189,248,0.16) 0%, rgba(56,189,248,0) 70%)",
    "radial-gradient(circle, rgba(129,140,248,0.12) 0%, rgba(129,140,248,0) 70%)",
    "radial-gradient(circle, rgba(52,211,153,0.09) 0%, rgba(52,211,153,0) 70%)",
  ],
  subtle: [
    "radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(56,189,248,0) 70%)",
    "radial-gradient(circle, rgba(129,140,248,0.06) 0%, rgba(129,140,248,0) 70%)",
    "radial-gradient(circle, rgba(52,211,153,0.05) 0%, rgba(52,211,153,0) 70%)",
  ],
};

export default function AnimatedGlow({
  variant = "subtle",
  className = "",
}: {
  variant?: keyof typeof PALETTES;
  className?: string;
}) {
  const [a, b, c] = PALETTES[variant];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-2xl"
        style={{ background: a }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 20, -10, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-1/4 top-1/3 h-[420px] w-[420px] translate-x-1/2 rounded-full blur-2xl"
        style={{ background: b }}
        animate={{
          x: [0, -30, 30, 0],
          y: [0, -20, 10, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-[380px] w-[380px] -translate-x-1/2 translate-y-1/3 rounded-full blur-2xl"
        style={{ background: c }}
        animate={{
          x: [0, 25, -25, 0],
          y: [0, -15, 15, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
