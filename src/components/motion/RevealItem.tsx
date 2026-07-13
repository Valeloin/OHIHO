"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { REVEAL_ITEM } from "./RevealGroup";

export default function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={REVEAL_ITEM}>
      {children}
    </motion.div>
  );
}
