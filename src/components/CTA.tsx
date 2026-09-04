import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Mail, Phone } from 'lucide-react';
import { useInquiry } from '../inquiry';
import Magnetic from '../motion/Magnetic';

// The conclusion of the film: what-we-do → what-could-we-build → LET'S GROW.
export default function CTA() {
  const openInquiry = useInquiry();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'end 0.6'],
  });
  const growScale = useTransform(scrollYProgress, [0, 1], [0.92, 1.04]);
  const vOpacity = useTransform(scrollYProgress, [0.35, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="contact" className="relative bg-gold py-28 px-[5%] text-center overflow-hidden">
      {/* Pattern Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230d1e33' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <p className="text-[0.7rem] font-semibold text-navy-deep/70 uppercase tracking-[0.3em] mb-5">
          You've seen what we do.
        </p>
        <h2 className="font-serif text-2xl md:text-4xl font-normal text-navy-deep leading-tight tracking-tight mb-8">
          What can we <em className="italic not-italic">build together?</em>
        </h2>

        <motion.p
          style={reduce ? undefined : { scale: growScale }}
          className="font-serif font-bold text-navy-deep leading-[0.95] tracking-tight text-[19vw] md:text-[11rem] mb-2 origin-center"
        >
          LET'S GROW.
        </motion.p>
        <motion.p
          style={reduce ? undefined : { opacity: vOpacity }}
          className="font-serif text-gold text-5xl md:text-6xl font-bold leading-none mb-10"
          aria-hidden="true"
        >
          V
        </motion.p>

        <p className="text-lg text-navy-deep/70 max-w-2xl mx-auto mb-11 font-light">
          Whether you're a startup or an established brand, we have the strategy, the team, and the tools to take you further.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Magnetic className="inline-flex">
            <button
              onClick={() => openInquiry()}
              data-cursor="START"
              className="inline-flex items-center gap-2.5 bg-navy-deep text-white px-8 py-4 rounded-sm text-[0.8rem] font-semibold uppercase tracking-[0.12em] hover:bg-navy-mid hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(13,30,51,0.3)] transition-all cursor-pointer"
            >
              <Phone size={18} />
              Start a Project
            </button>
          </Magnetic>
          <Magnetic className="inline-flex">
            <a
              href="mailto:vyden.co@gmail.com"
              className="inline-flex items-center gap-2.5 bg-navy-deep text-white px-8 py-4 rounded-sm text-[0.8rem] font-semibold uppercase tracking-[0.12em] hover:bg-navy-mid hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(13,30,51,0.3)] transition-all"
            >
              <Mail size={18} />
              Send Us an Email
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
