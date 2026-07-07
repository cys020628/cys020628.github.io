'use client';

import { motion } from 'framer-motion';

type WorkCardProps = {
  index: string;
  title: string;
  summary: string;
  stack: string;
};

export function WorkCard({ index, title, summary, stack }: WorkCardProps) {
  return (
    <motion.article
      initial={{ y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
      className="rounded-[1.5rem] bg-white p-7 shadow-card"
    >
      <p className="text-[0.875rem] font-semibold text-gray-500">{index}</p>
      <h3 className="mt-5 text-[1.5rem] font-bold leading-[1.34] text-gray-900">{title}</h3>
      <p className="mt-3 text-[1.0625rem] font-medium leading-[1.7] text-gray-600">{summary}</p>
      <p className="mt-8 text-[0.875rem] font-semibold text-gray-500">{stack}</p>
    </motion.article>
  );
}
