import { motion } from 'motion/react';

const humanTraits = ['Creativity', 'Instinct', 'Story', 'Emotion'];
const aiTraits = ['Data', 'Analysis', 'Scale', 'Speed'];

export default function HumanAI() {
  return (
    <section className="bg-navy-deep py-28 px-[5%] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <div className="w-6 h-[1px] bg-gold"></div>
            <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">Human x AI</span>
            <div className="w-6 h-[1px] bg-gold"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-white leading-tight tracking-tight">
            Instinct, Meet <em className="italic text-gold not-italic">Intelligence.</em>
          </h2>
        </motion.div>

        {/* Convergence flow — desktop */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-0 items-center max-w-5xl mx-auto">
          {/* Human side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-right pr-8"
          >
            <p className="font-mono text-[0.65rem] text-gold/60 tracking-[0.3em] mb-6">HUMAN</p>
            <div className="space-y-5">
              {humanTraits.map((w, i) => (
                <motion.div
                  key={w}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center justify-end gap-4"
                >
                  <span className="font-serif text-2xl md:text-3xl text-white font-light">{w}</span>
                  <div className="w-12 h-[1px] bg-gradient-to-l from-gold/40 to-transparent" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center V convergence */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 180, damping: 16 }}
            className="relative flex flex-col items-center px-4"
          >
            <svg viewBox="0 0 120 50" className="w-24 h-10" fill="none">
              <motion.line x1="0" y1="0" x2="60" y2="44" stroke="#c9a96e" strokeWidth="1" strokeOpacity="0.4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} />
              <motion.line x1="120" y1="0" x2="60" y2="44" stroke="#c9a96e" strokeWidth="1" strokeOpacity="0.4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} />
            </svg>
            <div className="w-20 h-20 rounded-full border border-gold/50 bg-gold/10 flex items-center justify-center -my-2 relative z-10">
              <img src="/vyden-v-gold.svg" alt="" aria-hidden="true" className="w-10 h-auto" width="40" height="32" decoding="async" />
            </div>
            <svg viewBox="0 0 120 50" className="w-24 h-10" fill="none">
              <motion.line x1="60" y1="6" x2="0" y2="50" stroke="#c9a96e" strokeWidth="1" strokeOpacity="0.4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7 }} />
              <motion.line x1="60" y1="6" x2="120" y2="50" stroke="#c9a96e" strokeWidth="1" strokeOpacity="0.4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8 }} />
            </svg>
          </motion.div>

          {/* AI side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left pl-8"
          >
            <p className="font-mono text-[0.65rem] text-gold/60 tracking-[0.3em] mb-6">AI</p>
            <div className="space-y-5">
              {aiTraits.map((w, i) => (
                <motion.div
                  key={w}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-[1px] bg-gradient-to-r from-gold/40 to-transparent" />
                  <span className="font-serif text-2xl md:text-3xl text-white font-light">{w}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden space-y-10">
          <div className="text-center">
            <p className="font-mono text-[0.65rem] text-gold/60 tracking-[0.3em] mb-4">HUMAN</p>
            <div className="flex flex-wrap justify-center gap-3">
              {humanTraits.map((w) => (
                <span key={w} className="font-serif text-lg text-white font-light px-3 py-1 border border-white/10">{w}</span>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full border border-gold/50 bg-gold/10 flex items-center justify-center">
              <img src="/vyden-v-gold.svg" alt="" aria-hidden="true" className="w-8 h-auto" width="32" height="26" decoding="async" />
            </div>
          </div>
          <div className="text-center">
            <p className="font-mono text-[0.65rem] text-gold/60 tracking-[0.3em] mb-4">AI</p>
            <div className="flex flex-wrap justify-center gap-3">
              {aiTraits.map((w) => (
                <span key={w} className="font-serif text-lg text-white font-light px-3 py-1 border border-white/10">{w}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mt-16"
        >
          <p className="font-mono text-[0.72rem] text-gold tracking-[0.3em]">
            HUMAN + INTELLIGENCE — VYDEN GROWTH
          </p>
          <p className="text-[0.85rem] text-white/45 font-light mt-3 max-w-xl mx-auto leading-relaxed">
            Human creativity gives every brand its identity. Machine intelligence gives
            it direction, speed and scale. We run both, together, on every account.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
