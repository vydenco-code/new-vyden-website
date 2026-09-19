import { motion } from 'motion/react';

const pillars = [
  {
    number: '01',
    title: 'Global Ambition',
    text: 'Building a brand recognized across continents — world-class digital solutions for businesses of every scale.',
  },
  {
    number: '02',
    title: 'AI-Powered Innovation',
    text: 'Artificial intelligence as a catalyst — smarter strategies, faster execution, measurable outcomes.',
  },
  {
    number: '03',
    title: 'Sustainable Growth',
    text: 'Scalable, cost-efficient marketing ecosystems that deliver results today and compound tomorrow.',
  },
];

// Clean vision section: large V mark reveal + three pillars. No rough SVGs.
export default function Vision() {
  return (
    <section id="vision" className="bg-off-white py-28 px-[5%] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Top: headline + V mark */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-gold"></div>
              <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">Our Vision</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-navy-deep leading-tight tracking-tight mb-6">
              Global Ambition.<br /><em className="italic text-navy-mid not-italic">Limitless Horizon.</em>
            </h2>
            <div className="space-y-5 text-[0.98rem] text-slate-600 leading-relaxed font-light">
              <p>
                We are building Vyden Co. into a name ambitious brands trust for marketing that grows and software that fits how they work. Our reach extends across continents, driven by trust, results, and forward-thinking strategy.
              </p>
              <p>
                By leveraging artificial intelligence, automation, and data-driven systems, we create smarter, faster, and more impactful marketing ecosystems for every client we serve.
              </p>
            </div>
          </motion.div>

          {/* Large V mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              {/* Outer ring */}
              <div className="w-52 h-52 md:w-64 md:h-64 rounded-full border border-navy-deep/10 flex items-center justify-center">
                {/* Inner ring */}
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border border-navy-deep/5 flex items-center justify-center">
                  <img
                    src="/vyden-v-gold.svg"
                    alt="Vyden Co. Vision"
                    className="w-20 h-auto md:w-24"
                    width="96"
                    height="76"
                    decoding="async"
                  />
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full bg-gold/40" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-1.5 h-1.5 rounded-full bg-gold/30" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 rounded-full bg-gold/30" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-1.5 h-1.5 rounded-full bg-gold/30" />
            </div>
          </motion.div>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white border border-slate-100 p-8 rounded-sm hover:border-gold/40 hover:shadow-[0_16px_40px_rgba(13,30,51,0.06)] transition-all group"
            >
              <span className="font-mono text-[0.65rem] text-gold/60 tracking-[0.3em] block mb-4">{p.number}</span>
              <h3 className="font-serif text-xl font-semibold text-navy-deep mb-3 group-hover:text-gold transition-colors">{p.title}</h3>
              <p className="text-[0.85rem] text-slate-500 leading-relaxed font-light">{p.text}</p>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
