import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'span' | 'div';
}

// Masked line reveal — text slides up from behind an overflow mask on scroll in.
export default function Reveal({ children, className, delay = 0, as = 'span' }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as === 'div' ? motion.div : motion.span;

  if (reduce) {
    return as === 'div' ? <div className={className}>{children}</div> : <span className={className}>{children}</span>;
  }

  return (
    <span className={`block overflow-hidden ${className ?? ''}`}>
      <Tag
        className="block will-change-transform"
        initial={{ y: '112%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </Tag>
    </span>
  );
}
