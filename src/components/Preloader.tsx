import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

// Architectural wireframe preloader: thin white lines sketch the Vyden V mark
// from corner guides inward, then fill solid. Counter climbs 000 → 100 below.
export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    if (reduce) {
      const t = setTimeout(() => doneRef.current(), 250);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    }

    let raf = 0;
    const duration = 2800;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => doneRef.current(), 400);
      }
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  const lineDelay = (i: number) => (reduce ? 0 : 0.1 + i * 0.12);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[300] bg-navy-deep flex flex-col items-center justify-center gap-8"
      aria-hidden="true"
    >
      {/* Wireframe construction + Logo reveal */}
      <div className="relative z-10 w-40 h-40 flex items-center justify-center">
        <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full" fill="none">
          {/* Corner registration marks */}
          <motion.g
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: lineDelay(0), ease: 'easeOut' }}
          >
            <line x1="10" y1="10" x2="24" y2="10" />
            <line x1="10" y1="10" x2="10" y2="24" />
            <line x1="136" y1="10" x2="150" y2="10" />
            <line x1="150" y1="10" x2="150" y2="24" />
            <line x1="10" y1="150" x2="24" y2="150" />
            <line x1="10" y1="136" x2="10" y2="150" />
            <line x1="136" y1="150" x2="150" y2="150" />
            <line x1="150" y1="136" x2="150" y2="150" />
          </motion.g>

          {/* Construction guide lines */}
          <motion.line
            x1="10" y1="80" x2="150" y2="80"
            stroke="white" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: lineDelay(1), ease: 'easeOut' }}
          />
          <motion.line
            x1="80" y1="10" x2="80" y2="150"
            stroke="white" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: lineDelay(1.5), ease: 'easeOut' }}
          />

          {/* Outer bounding box */}
          <motion.rect
            x="24" y="24" width="112" height="112"
            stroke="white" strokeWidth="0.75" strokeOpacity="0.2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: lineDelay(2), ease: 'easeOut' }}
          />

          {/* Dimension annotations */}
          <motion.g
            stroke="white" strokeWidth="0.5" strokeOpacity="0.2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: lineDelay(4), duration: 0.5 }}
          >
            <line x1="24" y1="142" x2="136" y2="142" />
            <line x1="24" y1="138" x2="24" y2="146" />
            <line x1="136" y1="138" x2="136" y2="146" />
            <line x1="142" y1="24" x2="142" y2="136" />
            <line x1="138" y1="24" x2="146" y2="24" />
            <line x1="138" y1="136" x2="146" y2="136" />
          </motion.g>
        </svg>

        {/* Actual Vyden logo — fades in after wireframe builds */}
        <motion.img
          src="/vyden-v-white.svg"
          alt=""
          className="relative z-10 w-16 h-auto"
          width="64"
          height="52"
          decoding="async"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: lineDelay(3), ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Brand text */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-serif text-white tracking-[0.45em] text-xl pl-2">VYDEN</p>
        <p className="text-[0.72rem] text-white/50 uppercase tracking-[0.32em] mt-2 pl-1">Digital Growth System</p>
      </motion.div>

      {/* Counter + progress */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <p className="font-mono text-white/70 text-sm tracking-[0.25em] tabular-nums">
          {String(count).padStart(3, '0')}%
        </p>
        <div className="w-48 h-[1px] bg-white/10 overflow-hidden mt-3 mx-auto">
          <div
            className="h-full bg-white/60 origin-left"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
