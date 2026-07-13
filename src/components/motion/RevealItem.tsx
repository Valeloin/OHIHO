"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { REVEAL_ITEM } from "./RevealGroup";

export default function RevealItem({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={REVEAL_ITEM}
      whileHover={
        hover ? { y: -6, transition: { duration: 0.25, ease: "easeOut" } } : undefined
      }
    >
      {children}
    </motion.div>
  );
}
