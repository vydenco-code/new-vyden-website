import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const nodes = ['BRAND', 'STRATEGY', 'CONTENT', 'AUDIENCE', 'DATA', 'GROWTH'];

// Compact bridge between Story and Orbit: the six links of every growth
// story, connected by a line that draws itself as you scroll past. No pin.
export default function BrandDNA() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top 88%',
          end: 'top 38%',
          scrub: 0.5,
        },
      })
        .fromTo('.dna-fill-x', { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0)
        .fromTo('.dna-fill-y', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 1 }, 0)
        .fromTo(
          '.dna-node',
          { opacity: 0.3 },
          { opacity: 1, ease: 'none', duration: 0.5, stagger: 0.1 },
          0
        )
        .fromTo(
          '.dna-dot',
          { scale: 0.6, backgroundColor: 'rgba(13,30,51,0.12)' },
          { scale: 1, backgroundColor: '#c9a96e', ease: 'none', duration: 0.3, stagger: 0.14 },
          0.05
        );
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-off-white py-16 md:py-20 px-[5%]">
      <p className="text-center text-[0.7rem] font-medium text-gold uppercase tracking-[0.3em]">
        Brand DNA — what makes a brand grow?
      </p>

      <div ref={trackRef} className="relative max-w-6xl mx-auto mt-10 md:mt-12">
        {/* connector line */}
        <div aria-hidden="true" className="hidden md:block absolute top-[27px] left-[8%] right-[8%] h-[2px] bg-navy-deep/10">
          <div className="dna-fill-x h-full w-full bg-gold origin-left" />
        </div>
        <div aria-hidden="true" className="md:hidden absolute left-[27px] top-3 bottom-3 w-[2px] bg-navy-deep/10">
          <div className="dna-fill-y h-full w-full bg-gold origin-top" />
        </div>

        <ol className="flex flex-col md:flex-row justify-between gap-7 md:gap-4">
          {nodes.map((node, i) => (
            <li key={node} className="dna-node flex md:flex-col items-center gap-4 md:gap-3 md:text-center md:w-28">
              <span className="dna-dot w-14 h-14 md:mx-auto rounded-full border border-gold/50 bg-white flex items-center justify-center font-mono text-[0.62rem] text-navy-deep tracking-[0.15em] flex-shrink-0 relative z-10">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[0.68rem] font-semibold text-navy-deep uppercase tracking-[0.22em]">
                {node}
              </span>
            </li>
          ))}
          <li className="dna-node flex md:flex-col items-center gap-4 md:gap-3 md:text-center md:w-28" aria-hidden="true">
            <span className="dna-dot w-14 h-14 md:mx-auto rounded-full bg-navy-deep flex items-center justify-center flex-shrink-0 relative z-10">
              <span className="font-serif text-gold text-2xl font-bold leading-none">V</span>
            </span>
            <span className="text-[0.68rem] font-semibold text-gold uppercase tracking-[0.22em]">Vyden way</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
