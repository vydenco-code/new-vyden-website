import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => {
            const lenis = (window as unknown as { __lenis?: { scrollTo: (t: unknown, o?: Record<string, unknown>) => void } }).__lenis;
            if (lenis) lenis.scrollTo(0, { offset: 0 });
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Back to top"
          className="fixed bottom-20 left-7 z-[900] w-12 h-12 rounded-full border border-gold/50 bg-navy-deep/90 backdrop-blur-sm text-gold flex items-center justify-center hover:bg-gold hover:text-navy-deep transition-colors cursor-pointer lg:bottom-7"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
