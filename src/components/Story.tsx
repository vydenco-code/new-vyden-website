import { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  'Vyden Co. was founded on a simple yet powerful idea — to turn a shared dream into a bold reality. What began as a vision among driven individuals has grown into a results-focused full-service marketing & software solutions company built for the modern world.',
  'Rooted in Kolkata and shaped by an ever-evolving digital landscape, we are a team of young, passionate professionals who have lived and breathed digital from the very beginning. We don\u2019t just follow trends — we study them, understand them, and use them to create meaningful, measurable impact for every client we serve.',
  'Our approach is grounded in a deep understanding of algorithms, consumer behavior, and smart execution. Long before stepping into the industry, we immersed ourselves in the fundamentals of digital marketing — from SEO and content strategy to Meta and Google Ads and web design and development. Every solution we offer comes from real expertise, not guesswork.',
  'Vyden Co. is more than an agency. We are a team of individuals with complementary strengths, united by one goal: delivering results that move the needle. We take action, push boundaries, and constantly evolve — because standing still was never part of the plan.',
  'At our core, we stand by one belief — if you dare to grow, we dare to deliver.',
];

// Pinned storytelling: the section locks while each paragraph illuminates in turn.
export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  // Layout effect on purpose: cleanup must unpin (restore DOM) BEFORE React
  // removes nodes on unmount. A passive effect cleans up too late and React
  // crashes with "removeChild ... not a child of this node".
  useLayoutEffect(() => {
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
  }, []);

  return (
    <section id="story" ref={sectionRef} className="bg-white min-h-screen py-24 px-[5%] flex justify-center items-center overflow-hidden">
      <div className="flex flex-col max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-gold"></div>
            <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">About Us</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-navy-deep leading-tight tracking-tight mb-8">
            Driven by Passion.<br /><em className="italic text-navy-mid not-italic">Defined by Results.</em>
          </h2>
        </motion.div>
        <div className="space-y-5 text-[0.98rem] text-slate-600 leading-relaxed font-light">
          {paragraphs.map((text, i) => (
            <p key={i} className="story-line">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
