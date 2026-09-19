import { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const paragraphs = [
  'Vyden Co. was founded on a simple yet powerful idea \u2014 to turn a shared dream into a bold reality. What began as a vision among driven individuals has grown into a results-focused full-service marketing & software solutions company built for the modern world.',
  'Rooted in India and shaped by an ever-evolving digital landscape, we are a team of young, passionate professionals who have lived and breathed digital from the very beginning. We don\u2019t just follow trends \u2014 we study them, understand them, and use them to create meaningful, measurable impact for every client we serve.',
  'Our approach is grounded in a deep understanding of algorithms, consumer behavior, and smart execution. Long before stepping into the industry, we immersed ourselves in the fundamentals of digital marketing \u2014 from SEO and content strategy to Meta and Google Ads and web design and development. Every solution we offer comes from real expertise, not guesswork.',
];

export default function Story({ staticMode = false }: { staticMode?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (staticMode) return;
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('.story-line');
      gsap.set(lines, { opacity: 0.12, y: 36 });
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      }).to(lines, { opacity: 1, y: 0, stagger: 0.9, ease: 'none' });
    }, section);

    return () => ctx.revert();
  }, [staticMode]);

  return (
    <section id="story" ref={sectionRef} className="bg-white py-28 px-[5%] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-gold"></div>
              <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">About Us</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-navy-deep leading-tight tracking-tight mb-8">
              Driven by Passion.<br /><em className="italic text-navy-mid not-italic">Defined by Results.</em>
            </h2>
            <div className="space-y-5 text-[0.98rem] text-slate-600 leading-relaxed font-light">
              {paragraphs.map((text, i) => (
                <p key={i} className="story-line">{text}</p>
              ))}
            </div>
          </motion.div>

          {/* Right: abstract brand visual — no V logo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative bg-navy-deep rounded-sm overflow-hidden aspect-[4/5]">
              <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:30px_30px]" />

              {/* Abstract geometry */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" fill="none" aria-hidden="true">
                {/* Concentric circles */}
                <circle cx="200" cy="230" r="130" stroke="#c9a96e" strokeWidth="0.75" strokeOpacity="0.2" />
                <circle cx="200" cy="230" r="90" stroke="#c9a96e" strokeWidth="0.5" strokeOpacity="0.15" />
                <circle cx="200" cy="230" r="50" stroke="#c9a96e" strokeWidth="0.5" strokeOpacity="0.1" />
                {/* Diamond */}
                <polygon points="200,80 310,230 200,380 90,230" stroke="#c9a96e" strokeWidth="0.75" strokeOpacity="0.18" fill="none" />
                {/* Horizontal accent lines */}
                <line x1="50" y1="150" x2="170" y2="150" stroke="#c9a96e" strokeWidth="0.5" strokeOpacity="0.25" />
                <line x1="230" y1="150" x2="350" y2="150" stroke="#c9a96e" strokeWidth="0.5" strokeOpacity="0.25" />
                <line x1="80" y1="310" x2="160" y2="310" stroke="#c9a96e" strokeWidth="0.5" strokeOpacity="0.2" />
                <line x1="240" y1="310" x2="320" y2="310" stroke="#c9a96e" strokeWidth="0.5" strokeOpacity="0.2" />
                {/* Corner registration marks */}
                <line x1="20" y1="20" x2="40" y2="20" stroke="#c9a96e" strokeWidth="0.75" strokeOpacity="0.35" />
                <line x1="20" y1="20" x2="20" y2="40" stroke="#c9a96e" strokeWidth="0.75" strokeOpacity="0.35" />
                <line x1="360" y1="20" x2="380" y2="20" stroke="#c9a96e" strokeWidth="0.75" strokeOpacity="0.35" />
                <line x1="380" y1="20" x2="380" y2="40" stroke="#c9a96e" strokeWidth="0.75" strokeOpacity="0.35" />
                <line x1="20" y1="460" x2="40" y2="460" stroke="#c9a96e" strokeWidth="0.75" strokeOpacity="0.35" />
                <line x1="20" y1="460" x2="20" y2="480" stroke="#c9a96e" strokeWidth="0.75" strokeOpacity="0.35" />
                <line x1="360" y1="460" x2="380" y2="460" stroke="#c9a96e" strokeWidth="0.75" strokeOpacity="0.35" />
                <line x1="380" y1="460" x2="380" y2="480" stroke="#c9a96e" strokeWidth="0.75" strokeOpacity="0.35" />
                {/* Central dot */}
                <circle cx="200" cy="230" r="3" fill="#c9a96e" fillOpacity="0.6" />
              </svg>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[0.72rem] text-gold/50 tracking-[0.3em] uppercase">Est. India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
