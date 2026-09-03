import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import type { FAQ } from '../data/faqs';

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
  className?: string;
}

export default function FAQAccordion({ faqs, title, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`py-20 px-[5%] ${className ?? ''}`}>
      {title && (
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-navy-deep leading-tight tracking-tight mb-4">
            {title}
          </h2>
        </div>
      )}
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-white/10 bg-white rounded-sm overflow-hidden transition-all hover:border-gold/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer hover:bg-gold/[0.02] transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="text-[0.88rem] md:text-[0.95rem] font-light text-navy-deep leading-relaxed pr-4">
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-7 h-7 rounded-sm bg-navy-deep/5 flex items-center justify-center flex-shrink-0"
              >
                <Plus size={16} className="text-gold" strokeWidth={2} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                    <p className="text-[0.85rem] text-navy-deep/60 leading-relaxed font-light border-t border-white/10 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}