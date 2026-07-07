'use client';

import { motion, type Variants } from 'framer-motion';
import type { PropsWithChildren } from 'react';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.2, 0, 0, 1] },
  },
};

const cardVariants: Variants = {
  rest: { y: 0, scale: 1, boxShadow: '0 12px 32px rgba(25, 31, 40, 0.08)' },
  hover: {
    y: -4,
    scale: 1.015,
    boxShadow: '0 18px 48px rgba(25, 31, 40, 0.14)',
    transition: { duration: 0.22, ease: [0.2, 0, 0, 1] },
  },
};

export function MotionSection({ children }: PropsWithChildren) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
    >
      {children}
    </motion.section>
  );
}

export function MotionWorkCard({ children }: PropsWithChildren) {
  return (
    <motion.article variants={cardVariants} initial="rest" animate="rest" whileHover="hover">
      {children}
    </motion.article>
  );
}
