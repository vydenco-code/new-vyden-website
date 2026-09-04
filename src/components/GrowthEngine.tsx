import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../router';

const chain = [
  { name: 'BRAND', desc: 'Identity and positioning worth remembering.' },
  { name: 'STRATEGY', desc: 'Every move mapped before a rupee is spent.' },
  { name: 'CONTENT', desc: 'Reels, posts and podcasts that earn attention.' },
  { name: 'SOCIAL', desc: 'Distribution across Instagram, Facebook, YouTube.' },
  { name: 'ADS', desc: 'Meta and Google campaigns tuned for return.' },
  { name: 'DATA', desc: 'Tracking, reports and honest numbers.' },
  { name: 'AUDIENCE', desc: 'Creators and communities carrying the message.' },
  { name: 'GROWTH', desc: 'Leads, sales and footfall. The only metric that matters.' },
];

// Signature moment #3: the business model as a living machine. Nodes ignite
// as you scroll; an abstract growth line rises through them and resolves
// into a V. No pins — fully reversible scroll-linked transforms.
export default function GrowthEngine() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  const lineScale = useTransform(scrollYProgress, [0.02, 0.62], [0, 1]);
  const chartDraw = useTransform(scrollYProgress, [0.55, 0.88], [0, 1]);
  const vOpacity = useTransform(scrollYProgress, [0.86, 1], [0, 1]);
  const vScale = useTransform(scrollYProgress, [0.86, 1], [0.8, 1]);

  return (
    <section ref={sectionRef} id="growth-engine" className="bg-navy-deep py-24 px-[5%] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14">
        {/* Sticky thesis */}
        <div className="lg:sticky lg:top-28 self-start">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-gold"></div>
            <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">The System</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-white leading-tight tracking-tight mb-5">
            Growth Is<br />A <em className="italic text-gold not-italic">System.</em>
          </h2>
          <p className="text-[0.95rem] text-white/55 leading-relaxed font-light max-w-md mb-8">
            Not luck, not hacks. Eight links in a chain — when every link holds,
            the machine produces growth on schedule. Scroll to switch it on.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[0.75rem] text-gold uppercase tracking-[0.15em] hover:gap-3.5 transition-all"
          >
            See the full arsenal <ArrowRight size={15} />
          </Link>
        </div>

        {/* The chain */}
        <div className="relative pl-10 md:pl-14">
          <div aria-hidden="true" className="absolute left-[19px] md:left-[27px] top-3 bottom-3 w-[2px] bg-white/10">
            <motion.div
              style={reduce ? { scaleY: 1 } : { scaleY: lineScale }}
              className="h-full w-full bg-gradient-to-b from-gold/60 via-gold to-gold-light origin-top"
            />
          </div>

          <ol className="space-y-7 md:space-y-9">
            {chain.map((link, i) => (
              <motion.li
                key={link.name}
                initial={reduce ? false : { opacity: 0.25, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-18% 0px -18% 0px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <motion.span
                  aria-hidden="true"
                  initial={false}
                  whileInView={{ backgroundColor: '#c9a96e', boxShadow: '0 0 18px rgba(201,169,110,0.7)' }}
                  viewport={{ once: true, margin: '-18% 0px -18% 0px' }}
                  transition={{ duration: 0.4 }}
                  className="absolute -left-10 md:-left-14 top-1 w-5 h-5 rounded-full border border-gold/60 bg-navy-deep"
                  style={{ transform: 'translateX(-50%)' }}
                />
                <p className="font-mono text-[0.6rem] text-gold/70 tracking-[0.3em] mb-1">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-white font-normal tracking-wide">{link.name}</h3>
                <p className="text-[0.82rem] text-white/45 font-light mt-1">{link.desc}</p>
              </motion.li>
            ))}
          </ol>

          {/* Growth line resolving into V */}
          <div className="mt-12 border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="font-mono text-[0.62rem] text-white/40 tracking-[0.3em] mb-4">OUTPUT — ABSTRACT GROWTH CURVE</p>
            <svg viewBox="0 0 560 200" className="w-full h-auto" fill="none" aria-hidden="true">
              <motion.path
                d="M10 175 L90 158 L160 163 L240 118 L320 124 L400 72 L480 78 L545 28"
                stroke="#c9a96e"
                strokeWidth="2"
                style={reduce ? { pathLength: 1 } : { pathLength: chartDraw }}
              />
              {[175, 140, 100, 60].map((y) => (
                <line key={y} x1="10" y1={y} x2="550" y2={y} stroke="#ffffff" strokeOpacity="0.07" />
              ))}
              <motion.g style={reduce ? { opacity: 1, scale: 1 } : { opacity: vOpacity, scale: vScale }} transform-origin="480 60">
                <path d="M440 30 L480 92 L520 30" stroke="#e8c98a" strokeWidth="3" />
              </motion.g>
            </svg>
            <motion.p
              style={reduce ? { opacity: 1 } : { opacity: vOpacity }}
              className="font-serif text-xl text-gold mt-3 tracking-wide"
            >
              …everything eventually becomes V.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
