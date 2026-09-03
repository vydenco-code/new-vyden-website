import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How strongly the child follows the cursor (0–1). */
  strength?: number;
  /** Maximum travel in px. */
  max?: number;
}

// Subtle physical pull toward the cursor. Desktop pointers only —
// renders a plain wrapper on touch / reduced-motion.
export default function Magnetic({ children, className, strength = 0.32, max = 12 }: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  if (reduce || (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches)) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(Math.max(-max, Math.min(max, dx * strength)));
        y.set(Math.max(-max, Math.min(max, dy * strength)));
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
