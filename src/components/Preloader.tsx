import { useEffect } from 'react';
import { motion } from 'motion/react';

export default function Preloader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1400);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[300] bg-navy-deep flex flex-col items-center justify-center gap-6"
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      <motion.img
        src="/vyden-logo.svg"
        alt=""
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="h-16 w-auto relative z-10 brightness-0 invert"
        width="150"
        height="64"
      />
      <div className="relative z-10 w-40 h-[2px] bg-white/10 overflow-hidden rounded-full">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gold origin-left"
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-10 text-[0.62rem] text-gold/70 uppercase tracking-[0.3em]"
      >
        Vyden Your Horizons
      </motion.span>
    </motion.div>
  );
}
