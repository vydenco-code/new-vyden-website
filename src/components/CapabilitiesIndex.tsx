import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, ArrowUpRight, Bot, Crown, Globe, MapPin, Share2, Wrench } from 'lucide-react';
import { Link } from '../router';

const capabilities = [
  {
    title: 'Social Media Marketing',
    desc: 'Reels, content engines and Meta ads that turn followers into footfall.',
    icon: Share2,
  },
  {
    title: 'Google Business & Local SEO',
    desc: 'Own Maps and local search when nearby buyers are ready to act.',
    icon: MapPin,
  },
  {
    title: 'Branding & Public Relations',
    desc: 'Identities, press and presence that make you the obvious choice.',
    icon: Crown,
  },
  {
    title: 'WhatsApp Automation & AI',
    desc: 'Chatbots and flows that reply, follow up and close — automatically.',
    icon: Bot,
  },
  {
    title: 'Web & App Development',
    desc: 'Fast sites and apps designed to convert traffic into revenue.',
    icon: Globe,
  },
  {
    title: 'Custom Internal Software',
    desc: 'CRMs, dashboards and tools built around your exact workflow.',
    icon: Wrench,
    href: '/software',
  },
];

export default function CapabilitiesIndex() {
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 28 });
  const sy = useSpring(my, { stiffness: 260, damping: 28 });

  return (
    <section
      className="bg-navy-deep py-24 px-[5%]"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-gold"></div>
            <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">What We Do</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-white leading-tight tracking-tight">
            Capabilities,<br /><em className="italic text-gold not-italic">End to End.</em>
          </h2>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 self-start md:self-auto bg-transparent text-gold border border-gold/40 px-6 py-3 rounded-sm text-[0.75rem] font-medium uppercase tracking-[0.12em] hover:bg-gold hover:text-navy-deep transition-all"
        >
          All 13 Services <ArrowRight size={16} />
        </Link>
      </div>

      <div className="border-b border-white/10">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.06 }}
            >
              <Link
                to={cap.href ?? '/services'}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 md:gap-10 py-7 md:py-8 border-t border-white/10 transition-colors hover:bg-gold/[0.04] px-2 md:px-4 -mx-2 md:-mx-4"
              >
                <span className="font-mono text-[0.7rem] text-gold/70 tracking-[0.2em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="font-serif text-2xl sm:text-3xl md:text-[2.6rem] font-normal text-white leading-tight block transition-all duration-300 group-hover:text-gold group-hover:translate-x-2">
                    {cap.title}
                  </span>
                  <span className="text-[0.8rem] text-white/40 font-light mt-1 block group-hover:text-white/60 transition-colors">
                    {cap.desc}
                  </span>
                </span>
                <span className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/50 transition-all duration-300 group-hover:bg-gold group-hover:text-navy-deep group-hover:border-gold group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Floating preview card that chases the cursor (desktop only) */}
      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed top-0 left-0 z-40 hidden lg:block"
      >
        <div style={{ transform: 'translate(28px, -50%)' }}>
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 3 }}
                exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
                transition={{ duration: 0.22 }}
                className="w-60 bg-navy-mid border border-gold/40 rounded-sm p-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
              >
                {(() => {
                  const Icon = capabilities[active].icon;
                  return (
                    <>
                      <span className="w-11 h-11 bg-gold text-navy-deep flex items-center justify-center rounded-sm mb-4">
                        <Icon size={20} strokeWidth={1.75} />
                      </span>
                      <p className="font-serif text-xl text-white leading-snug mb-2">{capabilities[active].title}</p>
                      <p className="text-[0.72rem] text-white/50 font-light leading-relaxed">{capabilities[active].desc}</p>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
