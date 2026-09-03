import { motion } from 'motion/react';

export default function GoldDivider({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-2 ${dark ? 'bg-navy-deep' : 'bg-white'}`} aria-hidden="true">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1px] w-24 sm:w-40 bg-gradient-to-r from-transparent to-gold/70 origin-right"
      />
      <motion.span
        initial={{ opacity: 0, rotate: -90 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-gold text-xs"
      >
        ✦
      </motion.span>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1px] w-24 sm:w-40 bg-gradient-to-l from-transparent to-gold/70 origin-left"
      />
    </div>
  );
}
