import { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const netNodes: Array<[number, number]> = [
  [200, 150], [120, 90], [290, 85], [95, 210], [310, 215], [200, 250],
];
const netLinks: Array<[number, number]> = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 3], [2, 4], [3, 5], [4, 5],
];

// The vision as a 3-stage system, scrubbed: one point (India) → a connected
// network → the network resolving into a V. Lightweight SVG, no pin.
export default function Vision() {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 82%',
          end: 'bottom 40%',
          scrub: 0.6,
        },
      })
        .fromTo('.v-stage-1', { opacity: 1 }, { opacity: 0, ease: 'none', duration: 0.25 }, 0)
        .fromTo('.v-link', { pathLength: 0 }, { pathLength: 1, ease: 'none', duration: 0.4 }, 0.12)
        .fromTo('.v-node', { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.3, stagger: 0.04 }, 0.2)
        .fromTo('.v-stage-2', { opacity: 1 }, { opacity: 0.12, ease: 'none', duration: 0.2 }, 0.72)
        .fromTo('.v-final', { pathLength: 0 }, { pathLength: 1, ease: 'none', duration: 0.3 }, 0.68)
        .fromTo('.v-cap-1', { opacity: 1 }, { opacity: 0.3, ease: 'none', duration: 0.2 }, 0.1)
        .fromTo('.v-cap-2', { opacity: 0.3 }, { opacity: 1, ease: 'none', duration: 0.2 }, 0.3)
        .fromTo('.v-cap-2', { opacity: 1 }, { opacity: 0.3, ease: 'none', duration: 0.15 }, 0.7)
        .fromTo('.v-cap-3', { opacity: 0.3 }, { opacity: 1, ease: 'none', duration: 0.2 }, 0.75);
    }, stage);

    return () => ctx.revert();
  }, []);

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
            We are building Vyden Co. into a name ambitious brands trust for marketing that grows and software that fits how they work. We aim to expand our presence across continents, building a brand that represents trust, growth, and forward-thinking strategy on a global scale.
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
        className="relative"
      >
        <div
          ref={stageRef}
          className="relative bg-navy-deep rounded-sm shadow-xl overflow-hidden p-6 md:p-8 min-h-[420px] md:min-h-[480px] flex flex-col"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(201,169,110,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,0.6)_1px,transparent_1px)] bg-[size:36px_36px]"></div>
          </div>
          <p className="relative font-mono text-[0.62rem] text-gold/80 tracking-[0.3em] mb-2">VYDN / EXPANSION SYSTEM</p>

          <svg viewBox="0 0 400 300" className="relative w-full h-auto flex-grow" fill="none" aria-hidden="true">
            {/* Stage 1 — one point */}
            <g className="v-stage-1">
              <circle cx="200" cy="150" r="26" stroke="#c9a96e" strokeOpacity="0.3" />
              <circle cx="200" cy="150" r="6" fill="#c9a96e" />
              <text x="200" y="195" textAnchor="middle" fill="#c9a96e" fontSize="13" letterSpacing="4" fontFamily="monospace">INDIA</text>
            </g>
            {/* Stage 2 — the network */}
            <g className="v-stage-2">
              {netLinks.map(([a, b], i) => (
                <line
                  key={i}
                  className="v-link"
                  x1={netNodes[a][0]}
                  y1={netNodes[a][1]}
                  x2={netNodes[b][0]}
                  y2={netNodes[b][1]}
                  stroke="#c9a96e"
                  strokeOpacity="0.45"
                />
              ))}
              {netNodes.map(([x, y], i) => (
                <circle key={i} className="v-node" cx={x} cy={y} r={i === 0 ? 6 : 4} fill={i === 0 ? '#c9a96e' : '#ffffff'} fillOpacity={i === 0 ? 1 : 0.75} />
              ))}
            </g>
            {/* Stage 3 — the V */}
            <path
              className="v-final"
              d="M110 50 L200 250 L290 50"
              stroke="#e8c98a"
              strokeWidth="3"
              style={{ filter: 'drop-shadow(0 0 14px rgba(201,169,110,0.5))' }}
            />
          </svg>

          <div className="relative flex justify-between font-mono text-[0.6rem] tracking-[0.25em] mt-2">
            <span className="v-cap-1 text-gold">01 · INDIA ●</span>
            <span className="v-cap-2 text-white/70">02 · NETWORK</span>
            <span className="v-cap-3 text-gold">03 · V</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
