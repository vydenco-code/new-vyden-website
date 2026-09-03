import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useInquiry } from '../inquiry';
import { SITE } from '../data/site';

export default function ExitIntentPopup() {
  const openInquiry = useInquiry();
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (hasTriggered) return;
    if (e.clientY <= 0) {
      setIsOpen(true);
      setHasTriggered(true);
      try {
        localStorage.setItem('vyden-exit-popup', '1');
      } catch {}
    }
  }, [hasTriggered]);

  useEffect(() => {
    try {
      if (localStorage.getItem('vyden-exit-popup') === '1') {
        setHasTriggered(true);
      }
    } catch {}
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleMouseLeave]);

  const close = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="exit-intent-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-navy-deep/90 backdrop-blur-md" />
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-sm shadow-2xl p-8 md:p-10 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 text-slate-400 hover:text-navy-deep transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-gold text-xl">✦</span>
            </div>
            <h3 className="font-serif text-2xl text-navy-deep mb-3">Wait Before You Go</h3>
            <p className="text-[0.9rem] text-slate-500 leading-relaxed font-light mb-6">
              Let's turn that hesitation into growth. Our team is ready to help — just share what's on your mind and we'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => {
                openInquiry();
                setTimeout(close, 300);
              }}
              className="inline-flex items-center gap-2.5 bg-navy-deep text-white px-7 py-3.5 rounded-sm text-[0.8rem] font-semibold uppercase tracking-[0.12em] hover:bg-navy-mid hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Get a Free Consultation
            </button>
            <p className="text-[0.65rem] text-slate-400 mt-4">Or call <a href={`tel:${SITE.phoneRaw}`} className="text-gold hover:underline">{SITE.phoneDisplay}</a></p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}