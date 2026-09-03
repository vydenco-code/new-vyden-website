import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';

// Desktop cursor: dot + trailing ring + contextual label pill.
// Labels come from `data-cursor="VIEW | EXPLORE | START"` on interactive elements.
export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ringX = useSpring(mouseX, { damping: 25, stiffness: 250, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 250, mass: 0.5 });

  const dotX = useSpring(mouseX, { damping: 30, stiffness: 500, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 500, mass: 0.1 });

  const pillX = useSpring(mouseX, { damping: 20, stiffness: 180, mass: 0.6 });
  const pillY = useSpring(mouseY, { damping: 20, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const mouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const tagged = el.closest?.('[data-cursor]') as HTMLElement | null;
      setLabel(tagged?.dataset.cursor ?? null);
      setIsHovering(
        !!tagged ||
          el.tagName === 'A' ||
          el.tagName === 'BUTTON' ||
          !!el.closest('a') ||
          !!el.closest('button') ||
          el.classList.contains('cursor-pointer')
      );
    };

    window.addEventListener('mousemove', mouseMove, { passive: true });
    window.addEventListener('mouseover', mouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', mouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <div aria-hidden="true">
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-gold rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: ringX,
          y: ringY,
          scale: label ? 2 : isHovering ? 1.5 : 1,
          backgroundColor: label || isHovering ? 'rgba(201, 169, 110, 0.2)' : 'transparent',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{ x: dotX, y: dotY, translateX: '12px', translateY: '12px' }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{ x: pillX, y: pillY, translateX: '28px', translateY: '20px' }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="block bg-gold text-navy-deep text-[0.58rem] font-bold uppercase tracking-[0.22em] px-3.5 py-1.5 rounded-full shadow-lg whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
