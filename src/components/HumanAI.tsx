import { motion } from 'motion/react';

const human = ['Creativity', 'Instinct', 'Story', 'Emotion'];
const machine = ['Data', 'Analysis', 'Scale', 'Speed'];

// Two disciplines converge into one mark. No robot graphics, no purple
// gradients — just type, hairlines and the V they resolve into.
export default function HumanAI() {
  return (
    <section className="bg-navy-deep py-24 px-[5%] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-4 justify-center">
          <div className="w-6 h-[1px] bg-gold"></div>
          <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">Human × AI</span>
          <div className="w-6 h-[1px] bg-gold"></div>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-normal text-white leading-tight tracking-tight mb-14">
          Instinct, Meet <em className="italic text-gold not-italic">Intelligence.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-8 items-center max-w-4xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center md:text-right"
          >
            <p className="font-mono text-[0.65rem] text-white/40 tracking-[0.3em] mb-4">HUMAN</p>
            <ul className="space-y-3">
              {human.map((w) => (
                <li key={w} className="font-serif text-2xl md:text-3xl text-white font-light">
                  {w}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.35, type: 'spring', stiffness: 200, damping: 18 }}
            className="mx-auto w-20 h-20 rounded-full border border-gold/50 bg-gold/10 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="font-serif text-gold text-4xl font-bold leading-none">V</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center md:text-left"
          >
            <p className="font-mono text-[0.65rem] text-white/40 tracking-[0.3em] mb-4">AI</p>
            <ul className="space-y-3">
              {machine.map((w) => (
                <li key={w} className="font-serif text-2xl md:text-3xl text-white font-light">
                  {w}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
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
