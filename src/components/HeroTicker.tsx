import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

// Same numbers as the Stats section — single source of truth lives there.
const tickerStats = [
  { value: 13, suffix: '+', label: 'Core Services' },
  { value: 500, suffix: '+', label: 'Creator Network' },
  { value: 150, suffix: 'K+', label: 'Organic Reach' },
];

function TickerNumber({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const duration = 1600;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);

  return (
    <span>
      {val}
      <span className="text-gold">{suffix}</span>
    </span>
  );
}

export default function HeroTicker() {
  const [start, setStart] = useState(false);

  // Start counting once the preloader has lifted.
  useEffect(() => {
    const id = setTimeout(() => setStart(true), 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: start ? 1 : 0, y: start ? 0 : 16 }}
      transition={{ duration: 0.7 }}
      className="flex items-stretch gap-6 sm:gap-10 mt-10"
      aria-label="Vyden Co. in numbers"
    >
      {tickerStats.map((stat, i) => (
        <div key={stat.label} className={`flex items-stretch gap-6 sm:gap-10 ${i > 0 ? 'border-l border-white/15 pl-6 sm:pl-10' : ''}`}>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-medium text-white leading-none">
              <TickerNumber to={stat.value} suffix={stat.suffix} start={start} />
            </div>
            <div className="text-[0.6rem] font-medium text-white/50 uppercase tracking-[0.22em] mt-1.5">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
