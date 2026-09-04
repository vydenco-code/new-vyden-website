import type { ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react';

interface VelocityTypeProps {
  children: ReactNode;
  className?: string;
  /** Maximum horizontal stretch at high scroll velocity. */
  max?: number;
}

// Display type that stretches horizontally with scroll velocity and settles
// when scrolling stops. Transform-only (no reflow). Apply sparingly.
export default function VelocityType({ children, className, max = 0.05 }: VelocityTypeProps) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 120, damping: 30 });
  const stretch = useTransform(smooth, (v) => 1 + Math.min(max, Math.abs(v) / 60000));

  if (reduce) {
    return <span className={`block ${className ?? ''}`}>{children}</span>;
  }

  return (
    <motion.span className={`block origin-left will-change-transform ${className ?? ''}`} style={{ scaleX: stretch }}>
      {children}
    </motion.span>
  );
}
