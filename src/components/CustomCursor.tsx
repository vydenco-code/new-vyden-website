import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  // Use motion values to avoid React re-renders on every mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const innerCursorX = useSpring(mouseX, { damping: 30, stiffness: 500, mass: 0.1 });
  const innerCursorY = useSpring(mouseY, { damping: 30, stiffness: 500, mass: 0.1 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
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
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(201, 169, 110, 0.2)' : 'transparent',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: innerCursorX,
          y: innerCursorY,
          translateX: '12px',
          translateY: '12px'
        }}
      />
    </div>
  );
}
