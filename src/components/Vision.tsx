import { motion } from 'motion/react';

const highlights = [
  {
    title: 'Global Expansion',
    description: 'Building a brand recognized across continents with world-class digital solutions for businesses of all sizes.'
  },
  {
    title: 'AI-Powered Innovation',
    description: 'Leveraging artificial intelligence as a catalyst for transformation — enabling intelligent strategies and optimized campaigns.'
  },
  {
    title: 'Sustainable Growth Models',
    description: 'Creating scalable, cost-efficient marketing ecosystems that deliver measurable results at scale for every client.'
  }
];

export default function Vision() {
  return (
    <section id="vision" className="bg-off-white py-24 px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-6 h-[1px] bg-gold"></div>
          <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">Our Vision</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-normal text-navy-deep leading-tight tracking-tight mb-5">
          Global Ambition.<br /><em className="italic text-navy-mid not-italic">Limitless Horizon.</em>
        </h2>
        <div className="space-y-5 text-[0.98rem] text-slate-600 leading-relaxed font-light mb-9">
          <p>
            At Vyden Co., our vision is to become a globally recognized leader in digital marketing and drop servicing, setting new benchmarks for innovation, performance, and scalability. We aim to expand our presence across continents, building a brand that represents trust, growth, and forward-thinking strategy on a global scale.
          </p>
          <p>
            By leveraging the power of artificial intelligence, automation, and data-driven systems, we strive to eliminate inefficiencies and create smarter, faster, and more impactful marketing ecosystems for every client we serve.
          </p>
        </div>

        <div className="space-y-4">
          {highlights.map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-5 bg-white border-l-[3px] border-gold rounded-r-sm shadow-sm">
              <div>
                <h4 className="font-serif text-lg font-semibold text-navy-deep mb-1">{item.title}</h4>
                <p className="text-[0.83rem] text-slate-500 leading-relaxed font-light">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative h-[380px] md:h-[480px] lg:h-[520px]"
      >
        <div className="absolute top-0 right-0 w-[85%] md:w-[48%] lg:w-4/5 h-[65%] md:h-[90%] lg:h-[65%] bg-navy-deep flex flex-col items-center justify-center gap-3 rounded-sm shadow-xl overflow-hidden">
          {/* Local branded visual: gold grid + soft glow (no external requests) */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(201,169,110,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,0.6)_1px,transparent_1px)] bg-[size:36px_36px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(201,169,110,0.35),transparent_60%)]"></div>
          </div>
          <div className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gold/30 tracking-tighter relative z-10">AI × Growth</div>
          <p className="text-[0.7rem] md:text-[0.75rem] text-white/80 uppercase tracking-[0.2em] text-center px-6 relative z-10 font-medium">Powered by Artificial Intelligence & Automation</p>
        </div>
        <div className="absolute bottom-0 left-0 w-[65%] md:w-[48%] lg:w-[65%] h-[40%] md:h-[90%] lg:h-[45%] bg-gold flex flex-col items-center justify-center p-7 rounded-sm shadow-lg">
          <div className="font-serif text-4xl md:text-5xl font-bold text-navy-deep leading-none">∞</div>
          <p className="text-[0.65rem] md:text-[0.72rem] text-navy-deep/70 uppercase tracking-[0.15em] text-center mt-2">The horizon is limitless</p>
        </div>
      </motion.div>
    </section>
  );
}
