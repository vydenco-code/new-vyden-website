import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';

interface LivingVProps {
  /** Hero scroll progress (0 at top → 1 scrolled away). */
  progress: MotionValue<number>;
}

// Signature moment #1: a gold light-form V living behind the hero headline.
// It leans toward the cursor, settles when left alone, and rotates/fades
// away on scroll. Pure SVG + rAF — no WebGL, no particles.
export default function LivingV({ progress }: LivingVProps) {
  const reduce = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const rotate = useTransform(progress, [0, 1], [0, 16]);
  const opacity = useTransform(progress, [0, 1], [0.55, 0]);
  const scale = useTransform(progress, [0, 1], [1, 1.18]);

  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap || reduce) return;

    const section = document.getElementById('home');
    let raf = 0;
    let visible = true;
    let bend = 0;
    let target = 0;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
      }
    });
    io.observe(wrap);

    const tick = () => {
      bend += (target - bend) * 0.075;
      const v = 100 + bend;
      path.setAttribute('d', `M28 22 L${v.toFixed(1)} 178 L172 22`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const host = section ?? wrap;
      const rect = host.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
      target = Math.max(-30, Math.min(30, nx * 52));
    };
    const onLeave = () => {
      target = 0;
    };

    const host: HTMLElement | Window = section ?? window;
    host.addEventListener('pointermove', onMove as EventListener, { passive: true });
    (section ? document : window).addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener('pointermove', onMove as EventListener);
      (section ? document : window).removeEventListener('pointerleave', onLeave);
    };
  }, [reduce]);

  return (
    <motion.div
      ref={wrapRef}
      aria-hidden="true"
      style={reduce ? { opacity: 0.5 } : { rotate, opacity, scale }}
      className="absolute left-[-60px] sm:left-[-30px] top-1/2 -translate-y-1/2 w-[300px] sm:w-[420px] lg:w-[520px] pointer-events-none select-none"
    >
      <svg viewBox="0 0 200 200" className="w-full h-auto overflow-visible" fill="none">
        <defs>
          <linearGradient id="living-v-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#c9a96e" stopOpacity="0.12" />
            <stop offset="0.5" stopColor="#e8c98a" stopOpacity="0.85" />
            <stop offset="1" stopColor="#c9a96e" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M28 22 L100 178 L172 22"
          stroke="url(#living-v-stroke)"
          strokeWidth="2.5"
          strokeLinejoin="miter"
          style={{ filter: 'drop-shadow(0 0 22px rgba(201,169,110,0.4))' }}
        />
        {/* faint echo arms for depth */}
        <path d="M44 22 L100 150 L156 22" stroke="#c9a96e" strokeOpacity="0.14" strokeWidth="1.5" />
        <path d="M12 22 L100 196 L188 22" stroke="#c9a96e" strokeOpacity="0.08" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}
