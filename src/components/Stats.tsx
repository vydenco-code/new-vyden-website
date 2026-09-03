import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'motion/react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  text: string;
}

const stats: Stat[] = [
  {
    value: 13,
    suffix: '+',
    label: 'Core Services',
    text: 'Digital marketing, traditional advertising and custom software — everything your brand needs under one roof.',
  },
  {
    value: 500,
    suffix: '+',
    label: 'Creator Network',
    text: 'Influencers and UGC creators across niches, ready to carry your campaign to the right audience.',
  },
  {
    value: 150,
    suffix: 'K+',
    label: 'Organic Reach',
    text: 'Real, unpaid reach delivered for brands — converted into footfall, leads and sales.',
  },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      <span className="text-gold">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="bg-white py-24 px-[5%]">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-6 h-[1px] bg-gold"></div>
          <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">Vyden In Numbers</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-normal text-navy-deep leading-tight tracking-tight mb-14">
          Proof, Not <em className="italic text-navy-mid not-italic">Promises.</em>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative pl-7 border-l-[3px] border-gold"
            >
              <div className="font-serif text-6xl md:text-7xl font-medium text-navy-deep leading-none mb-3">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[0.7rem] font-semibold text-navy-deep uppercase tracking-[0.22em] mb-2.5">
                {stat.label}
              </div>
              <p className="text-[0.85rem] text-slate-500 leading-relaxed font-light max-w-[260px]">
                {stat.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
