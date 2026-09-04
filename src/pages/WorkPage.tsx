import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, MoveRight, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '../router';
import { useInquiry } from '../inquiry';
import { SITE } from '../data/site';
import { getPublishedClients } from '../data/clients';
import type { Client } from '../data/clients';
import PageHeader from '../components/PageHeader';
import Spotlight from '../components/Spotlight';
import { useSpotlight } from '../hooks/useSpotlight';
import { usePageMeta } from '../hooks/usePageMeta';

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
  const clients = getPublishedClients();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const openInquiry = useInquiry();
  usePageMeta('Our Work', 'Case studies from Vyden Co. — social media growth, influencer campaigns, brand identity and marketing that drives real footfall.');

  // Floating logo preview chasing the cursor over card titles (desktop).
  const [preview, setPreview] = useState<Client | null>(null);
  const pmx = useMotionValue(0);
  const pmy = useMotionValue(0);
  const psx = useSpring(pmx, { stiffness: 260, damping: 28 });
  const psy = useSpring(pmy, { stiffness: 260, damping: 28 });

  // Desktop: pin the section and glide the track sideways. Mobile: native swipe.
  // Layout effect on purpose: unpin cleanup must restore the DOM BEFORE React
  // removes nodes on unmount (passive cleanup runs too late → removeChild crash).
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance() + 200}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, { scaleX: self.progress });
              }
            },
          },
        });

        // Cinematic layer: giant outline titles drift against the rail direction.
        gsap.utils.toArray<HTMLElement>('.work-card').forEach((card) => {
          const title = card.querySelector('.work-giant-title');
          if (!title) return;
          gsap.fromTo(
            title,
            { xPercent: 18 },
            {
              xPercent: -18,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        });
      }, section);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <PageHeader
        label="Our Work"
        title={<>Brands We've Built<br /><em className="italic text-gold not-italic">And Grown.</em></>}
        description="We partner with brands across industries to drive measurable growth, strengthen brand identity, and build high-impact marketing campaigns. Here's a closer look at that work."
      />

      <section
        ref={sectionRef}
        onMouseMove={(e) => {
          pmx.set(e.clientX);
          pmy.set(e.clientY);
        }}
        className="bg-navy-mid py-24 overflow-hidden lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
      >
        <div className="px-[5%] mb-10 flex items-end justify-between gap-6">
          <p className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">
            Selected Work <span className="text-white/30 normal-case tracking-normal font-light">— {clients.length} case studies</span>
          </p>
          <p className="hidden lg:flex items-center gap-2 text-[0.7rem] text-white/40 uppercase tracking-[0.2em]">
            Scroll to explore <MoveRight size={15} className="text-gold" />
          </p>
          <p className="lg:hidden text-[0.7rem] text-white/40 uppercase tracking-[0.2em]">Swipe →</p>
        </div>

        <div className="overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div ref={trackRef} className="flex gap-6 w-max px-[5%] will-change-transform">
            {clients.map((project, index) => (
              <WorkCard key={project.slug} project={project} index={index} onPreview={setPreview} />
            ))}
            {/* End-of-rail inquiry panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-[82vw] sm:w-[400px] lg:w-[420px] shrink-0 snap-center"
            >
              <div className="h-full min-h-[420px] bg-gold rounded-sm p-9 flex flex-col justify-center relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230d1e33' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
                />
                <p className="relative text-[0.68rem] font-semibold text-navy-deep/70 uppercase tracking-[0.22em] mb-4">Your Turn</p>
                <h3 className="relative font-serif text-3xl lg:text-4xl font-normal text-navy-deep leading-tight mb-4">
                  Your Brand<br />Could Be Next.
                </h3>
                <p className="relative text-[0.85rem] text-navy-deep/70 leading-relaxed font-light mb-8">
                  Liked what you saw? Tell us where your brand stands — we'll sketch where it could go, free.
                </p>
                <button
                  onClick={() => openInquiry()}
                  data-cursor="START"
                  className="relative inline-flex items-center justify-center gap-2 bg-navy-deep text-white px-7 py-3.5 rounded-sm text-[0.78rem] font-semibold uppercase tracking-[0.12em] hover:bg-navy-mid hover:-translate-y-0.5 transition-all cursor-pointer mb-3"
                >
                  <Phone size={16} /> Start Your Story
                </button>
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center gap-1.5 text-[0.72rem] text-navy-deep/70 uppercase tracking-[0.12em] hover:text-navy-deep transition-colors"
                >
                  or WhatsApp us <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Rail progress */}
        <div className="px-[5%] mt-10 hidden lg:block">
          <div className="h-[2px] bg-white/10 overflow-hidden">
            <div ref={progressRef} className="h-full w-full bg-gold origin-left scale-x-0" />
          </div>
        </div>

        {/* Floating logo preview following the cursor over titles (desktop) */}
        <motion.div
          aria-hidden="true"
          style={{ x: psx, y: psy }}
          className="pointer-events-none fixed top-0 left-0 z-40 hidden lg:block"
        >
          <div style={{ transform: 'translate(28px, -50%)' }}>
            <AnimatePresence>
              {preview && (
                <motion.div
                  key={preview.slug}
                  initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 2 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.22 }}
                  className="w-64 bg-white rounded-sm p-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                >
                  {preview.logoUrl ? (
                    <img src={preview.logoUrl} alt="" aria-hidden="true" className="h-16 w-auto object-contain mb-3" loading="lazy" decoding="async" />
                  ) : (
                    <p className="font-serif text-xl font-bold text-navy-deep/30 uppercase mb-3">{preview.logo}</p>
                  )}
                  <p className="font-serif text-lg text-navy-deep leading-snug">{preview.title}</p>
                  <p className="text-[0.62rem] text-gold font-semibold uppercase tracking-[0.2em] mt-1">{preview.tag}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </>
  );
}

function WorkCard({ project, index, onPreview }: { project: Client; index: number; onPreview: (c: Client | null) => void }) {
  const { ref, pos, onMouseMove } = useSpotlight<HTMLElement>();

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index, 2) * 0.1 }}
      className="work-card group relative w-[82vw] sm:w-[400px] lg:w-[420px] shrink-0 snap-center"
    >
      <span
        aria-hidden="true"
        className="work-giant-title pointer-events-none select-none absolute -top-14 left-0 font-serif font-bold uppercase whitespace-nowrap text-7xl leading-none z-0"
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.16)', color: 'transparent' }}
      >
        {project.title}
      </span>
      <Spotlight x={pos.x} y={pos.y} />
      <Link to={`/work/${project.slug}`} data-cursor="VIEW" className="relative z-10 block h-full bg-white/5 rounded-sm overflow-hidden transition-all hover:bg-white/10 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
        <div className="h-48 group-hover:h-60 transition-all duration-500 bg-white relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          {project.logoUrl ? (
            <img
              src={project.logoUrl}
              alt={`${project.title} Client Logo`}
              className="h-24 w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-125"
              loading="lazy"
              decoding="async"
              width="200"
              height="96"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 relative z-10">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                <span className="text-slate-300 text-[0.6rem] uppercase tracking-widest font-bold">Logo</span>
              </div>
              <span className="font-serif text-xl font-bold text-navy-deep/20 tracking-tight uppercase">{project.logo}</span>
            </div>
          )}

          {/* glare sweep on hover */}
          <div aria-hidden="true" className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-gold/25 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold z-20"></div>
        </div>
        <div className="p-8">
          <span className="inline-block text-[0.65rem] font-semibold text-gold uppercase tracking-[0.2em] mb-3">{project.tag}</span>
          <h3
            className="font-serif text-2xl font-semibold text-white mb-2.5"
            onMouseEnter={() => onPreview(project)}
            onMouseLeave={() => onPreview(null)}
          >
            {project.title}
          </h3>
          <p className="text-[0.82rem] text-white/50 leading-relaxed mb-5 font-light">{project.description}</p>
          <ul className="space-y-2 mb-6">
            {project.results.slice(0, 4).map((result, i) => (
              <li key={i} className="text-[0.78rem] text-white/65 flex items-start gap-2 leading-relaxed font-light">
                <span className="text-gold text-[0.6rem] mt-1.5 flex-shrink-0">✦</span>
                {result}
              </li>
            ))}
            {project.results.length > 4 && (
              <li className="text-[0.78rem] text-gold flex items-center gap-2 leading-relaxed font-light pt-1">
                +{project.results.length - 4} more — view details
              </li>
            )}
          </ul>
          <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-gold uppercase tracking-widest font-medium">
            View Case Study <ArrowRight size={13} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
