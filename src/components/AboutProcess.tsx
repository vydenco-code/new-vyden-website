import { motion } from 'motion/react';

// Visual flow diagram: how Vyden turns a brief into growth.
// Each step is a node; gold lines connect them; the flow resolves into results.

const steps = [
  {
    step: '01',
    title: 'Discover',
    text: 'We sit with your business. Understand the market, the customer, the gap.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#c9a96e" strokeWidth="1.5">
        <circle cx="18" cy="18" r="10" />
        <line x1="25" y1="25" x2="34" y2="34" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Strategize',
    text: 'Data-driven plan. Clear KPIs. A roadmap that makes sense for your budget.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#c9a96e" strokeWidth="1.5">
        <rect x="6" y="6" width="28" height="28" rx="2" />
        <line x1="6" y1="16" x2="34" y2="16" />
        <line x1="16" y1="16" x2="16" y2="34" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Create',
    text: 'Design, content, development — built by specialists, not generalists.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#c9a96e" strokeWidth="1.5">
        <polygon points="20,4 36,14 36,30 20,36 4,30 4,14" />
        <circle cx="20" cy="20" r="6" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Execute',
    text: 'Launch across channels. Digital, traditional, software — all at once.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#c9a96e" strokeWidth="1.5">
        <polygon points="14,8 32,20 14,32" />
      </svg>
    ),
  },
  {
    step: '05',
    title: 'Measure',
    text: 'Real-time data. Monthly reports. What worked, what to optimize.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#c9a96e" strokeWidth="1.5">
        <polyline points="4,30 12,20 20,24 28,12 36,8" />
        <polyline points="28,8 36,8 36,16" />
      </svg>
    ),
  },
  {
    step: '06',
    title: 'Grow',
    text: 'Compounding results. Every month builds on the last.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#c9a96e" strokeWidth="1.5">
        <path d="M8 32 L8 18 L16 12 L24 16 L32 6" />
        <polyline points="26,6 32,6 32,12" />
      </svg>
    ),
  },
];

export default function AboutProcess() {
  return (
    <section className="bg-off-white py-28 px-[5%] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <div className="w-6 h-[1px] bg-gold"></div>
            <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">How We Work</span>
            <div className="w-6 h-[1px] bg-gold"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-navy-deep leading-tight tracking-tight">
            From Brief to <em className="italic text-navy-mid not-italic">Growth.</em>
          </h2>
          <p className="text-[0.85rem] text-slate-500 mt-4 max-w-lg mx-auto font-light leading-relaxed">
            Six steps. One team. Every channel. Here's how we turn your ambition into measurable results.
          </p>
        </motion.div>

        {/* Flow diagram */}
        <div className="relative">
          {/* Connecting line — runs through all nodes */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Node circle */}
                <div className="relative z-10 w-16 h-16 rounded-full border border-gold/30 bg-off-white flex items-center justify-center mb-4 group-hover:border-gold group-hover:bg-gold/5 transition-all">
                  {s.icon}
                </div>

                {/* Step number */}
                <span className="font-mono text-[0.6rem] text-gold/50 tracking-[0.3em] mb-1">{s.step}</span>

                {/* Title */}
                <h3 className="font-serif text-lg font-semibold text-navy-deep mb-2 group-hover:text-gold transition-colors">{s.title}</h3>

                {/* Description */}
                <p className="text-[0.78rem] text-slate-500 leading-relaxed font-light max-w-[200px]">{s.text}</p>

                {/* Arrow connector (between nodes on desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-[1px]">
                    <div className="w-full h-full bg-gold/20" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-transparent border-l-gold/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
