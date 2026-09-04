import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

// Cinematic preloader: the V draws itself while the counter runs 000 → 100,
// then the whole screen lifts like a curtain into the hero.
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
    const duration = document.readyState === 'complete' ? 850 : 1150;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => doneRef.current(), 120);
      }
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[300] bg-navy-deep flex flex-col items-center justify-center gap-5"
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* Self-drawing V */}
      <svg viewBox="0 0 100 100" className="relative z-10 w-20 h-20" fill="none" aria-hidden="true">
        <motion.path
          d="M12 14 L50 86 L88 14"
          stroke="#c9a96e"
          strokeWidth="5"
          strokeLinecap="square"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 0.95, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <div className="relative z-10 text-center">
        <p className="font-serif text-white tracking-[0.4em] text-lg pl-2">VYDEN</p>
        <p className="text-[0.58rem] text-gold/70 uppercase tracking-[0.32em] mt-1.5 pl-1">Digital Growth System</p>
      </div>

      <p className="relative z-10 font-mono text-gold text-sm tracking-[0.25em] tabular-nums">
        {String(count).padStart(3, '0')}%
      </p>
      <div className="relative z-10 w-44 h-[2px] bg-white/10 overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-gold origin-left" style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </motion.div>
  );
}
