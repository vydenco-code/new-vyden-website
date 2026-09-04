import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../router';
import { useInquiry } from '../inquiry';
import { servicesData } from '../data/services';

// The original nine crafts, orbiting the mark. Drag to spin, hover to inspect.
const SHORT = ['SOCIAL', 'SEO / MAPS', 'BRAND & PR', 'PODCAST', 'WHATSAPP', 'WEB & APP', 'CREATORS', 'DESIGN', 'OUTDOOR'];
const MOTIFS = ['frames', 'grid', 'arcs', 'flow', 'flow', 'grid', 'frames', 'arcs', 'grid'] as const;
const orbitServices = servicesData.slice(0, 9).map((s, i) => ({
  title: s.title,
  description: s.description,
  details: s.details.slice(0, 3),
  short: SHORT[i] ?? s.title.toUpperCase(),
  motif: MOTIFS[i] ?? 'frames',
}));
const N = orbitServices.length;

// Abstract environment geometry behind the readout — pure CSS/SVG linework,
// one family per craft. No icons, no imagery.
function MotifLayer({ kind }: { kind: (typeof MOTIFS)[number] }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={kind}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            {kind === 'frames' && (
              <g stroke="#c9a96e" strokeOpacity="0.28" fill="none" strokeWidth="1.5">
                <rect x="60" y="40" width="150" height="140" />
                <rect x="230" y="20" width="170" height="180" />
                <rect x="420" y="55" width="120" height="110" />
              </g>
            )}
            {kind === 'grid' && (
              <g stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1.5">
                {[40, 85, 130, 175].map((y) => (
                  <line key={y} x1="40" y1={y} x2="560" y2={y} />
                ))}
                {[120, 240, 360, 480].map((x) => (
                  <line key={x} x1={x} y1="20" x2={x} y2="200" stroke="#c9a96e" strokeOpacity="0.22" />
                ))}
              </g>
            )}
            {kind === 'arcs' && (
              <g stroke="#c9a96e" fill="none">
                <ellipse cx="300" cy="230" rx="120" ry="120" strokeOpacity="0.3" strokeWidth="1.5" />
                <ellipse cx="300" cy="230" rx="190" ry="190" strokeOpacity="0.18" strokeWidth="1.5" />
                <ellipse cx="300" cy="230" rx="260" ry="260" strokeOpacity="0.1" strokeWidth="1.5" />
              </g>
            )}
            {kind === 'flow' && (
              <g fill="none" strokeWidth="1.5">
                <motion.path
                  d="M20 150 C 150 150, 150 70, 300 70 S 450 70, 580 70"
                  stroke="#c9a96e"
                  strokeOpacity="0.35"
                  strokeDasharray="10 12"
                  animate={{ strokeDashoffset: [0, -88] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M20 190 C 180 190, 180 120, 330 120 S 480 120, 580 120"
                  stroke="#ffffff"
                  strokeOpacity="0.16"
                  strokeDasharray="6 14"
                  animate={{ strokeDashoffset: [0, -80] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
                <circle cx="300" cy="70" r="4" fill="#c9a96e" fillOpacity="0.6" />
              </g>
            )}
          </svg>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ServiceOrbit() {
  const openInquiry = useInquiry();
  const boxRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Mutable loop state — never triggers renders.
  const loop = useRef({
    angle: -Math.PI / 2,
    vel: 0,
    dragging: false,
    lastX: 0,
    cursor: { x: -9999, y: -9999 },
    inside: false,
    visible: true,
    speed: 0.0024,
    off: Array.from({ length: N }, () => ({ x: 0, y: 0 })),
    size: 0,
    active: 0,
    raf: 0,
  });
  loop.current.active = active;

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const S = loop.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const measure = () => {
      S.size = box.clientWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);

    const place = () => {
      const size = S.size || box.clientWidth || 300;
      const cx = size / 2;
      const cy = size / 2;
      const rx = size * 0.42;
      const ry = Math.min(size * 0.3, 170);
      for (let i = 0; i < N; i++) {
        const el = nodeRefs.current[i];
        if (!el) continue;
        const a = S.angle + (i * Math.PI * 2) / N;
        const depth = (Math.sin(a) + 1) / 2; // 0 back → 1 front
        let x = cx + Math.cos(a) * rx;
        let y = cy + Math.sin(a) * ry;

        // Service gravity — nodes near the cursor lean away from it.
        const dx = x - S.cursor.x;
        const dy = y - S.cursor.y;
        const d = Math.hypot(dx, dy) || 1;
        const R = 120;
        const push = Math.max(0, (R - d) / R) * 30;
        const o = S.off[i];
        o.x += ((dx / d) * push - o.x) * 0.12;
        o.y += ((dy / d) * push - o.y) * 0.12;
        x += o.x;
        y += o.y;

        const scale = 0.72 + depth * 0.42;
        const isActive = S.active === i;
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.opacity = isActive ? '1' : (0.4 + depth * 0.45).toFixed(2);
        el.style.zIndex = isActive ? '30' : String(10 + Math.round(depth * 10));
      }
    };

    if (reduced) {
      place();
      return () => ro.disconnect();
    }

    const tick = () => {
      if (!S.dragging) {
        // Ease the spin down while the visitor is aiming at a node.
        const target = S.inside ? 0.0004 : 0.0024;
        S.speed += (target - S.speed) * 0.06;
        S.angle += S.speed + S.vel;
        S.vel *= 0.95;
      }
      place();
      if (S.visible) {
        S.raf = requestAnimationFrame(tick);
      }
    };
    S.raf = requestAnimationFrame(tick);

    // Pause the loop entirely while the section is offscreen (perf rule).
    const section = box.closest('section');
    const vis = new IntersectionObserver(
      ([entry]) => {
        const was = S.visible;
        S.visible = entry.isIntersecting;
        if (S.visible && !was) {
          cancelAnimationFrame(S.raf);
          S.raf = requestAnimationFrame(tick);
        }
      },
      { rootMargin: '120px' }
    );
    S.visible = true;
    if (section) vis.observe(section);

    const onDown = (e: PointerEvent) => {
      S.dragging = true;
      S.lastX = e.clientX;
      S.vel = 0;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const rect = box.getBoundingClientRect();
      S.cursor.x = e.clientX - rect.left;
      S.cursor.y = e.clientY - rect.top;
      S.inside = true;
      if (!S.dragging) return;
      const dx = e.clientX - S.lastX;
      S.lastX = e.clientX;
      const da = dx / Math.max(160, S.size * 0.4);
      S.angle += da;
      S.vel = S.vel * 0.7 + da * 0.3;
    };
    const onUp = () => {
      S.dragging = false;
    };
    const onLeave = () => {
      S.cursor.x = -9999;
      S.cursor.y = -9999;
      S.inside = false;
    };

    box.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    box.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(S.raf);
      ro.disconnect();
      vis.disconnect();
      box.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      box.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const current = orbitServices[active];

  return (
    <section id="orbit" className="bg-navy-deep py-24 px-[5%] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <div className="w-6 h-[1px] bg-gold"></div>
            <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">What We Do</span>
            <div className="w-6 h-[1px] bg-gold"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-white leading-tight tracking-tight">
            The Service <em className="italic text-gold not-italic">Orbit.</em>
          </h2>
          <p className="text-[0.68rem] font-mono text-white/40 uppercase tracking-[0.3em] mt-4">Drag to spin · Hover to inspect</p>
        </div>

        {/* Orbit field */}
        <div
          ref={boxRef}
          role="listbox"
          aria-label="Services orbit — use left and right arrow keys to browse"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') setActive((a) => (a + 1) % N);
            else if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + N) % N);
          }}
          className="relative mx-auto w-full max-w-[640px] h-[480px] sm:h-[540px] cursor-grab active:cursor-grabbing select-none outline-none"
          style={{ touchAction: 'pan-y' }}
        >
          {/* orbit path */}
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[62%] rounded-[50%] border border-white/10 pointer-events-none" />
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[62%] rounded-[50%] border border-gold/10 scale-110 pointer-events-none" />

          {/* center mark */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-20">
            <img src="/vyden-v-gold.svg" alt="" aria-hidden="true" className="h-12 sm:h-14 w-auto mx-auto mb-2 opacity-90" width="72" height="56" decoding="async" />
            <p className="font-serif text-white tracking-[0.35em] text-sm">VYDEN</p>
            <p className="font-mono text-[0.62rem] text-gold tracking-[0.25em] mt-1">
              {String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
            </p>
          </div>

          {orbitServices.map((s, i) => (
            <button
              key={s.title}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={s.title}
              role="option"
              aria-selected={active === i}
              data-cursor="EXPLORE"
              className="absolute left-0 top-0 w-[92px] h-[92px] sm:w-[104px] sm:h-[104px] rounded-full bg-navy-mid/85 backdrop-blur-sm border border-white/20 hover:border-gold flex flex-col items-center justify-center gap-1 transition-colors duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold will-change-transform"
            >
              <span className="font-mono text-[0.6rem] text-gold tracking-[0.2em]">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-sans text-[0.6rem] sm:text-[0.62rem] font-semibold text-white tracking-[0.12em] uppercase leading-tight px-2 text-center">
                {s.short}
              </span>
            </button>
          ))}
        </div>

        {/* Detail readout */}
        <div className="relative max-w-3xl mx-auto text-center min-h-[240px] mt-4 px-4 py-6" aria-live="polite">
          <MotifLayer kind={current.motif} />
          <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-[0.65rem] text-gold tracking-[0.3em] mb-3">0{active + 1} — NOW SHOWING</p>
              <h3 className="font-serif text-3xl md:text-5xl font-normal text-white leading-tight mb-4">{current.title}</h3>
              <p className="text-[0.95rem] text-white/55 font-light leading-relaxed max-w-xl mx-auto mb-5">{current.description}</p>
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-8">
                {current.details.map((d) => (
                  <li key={d} className="text-[0.72rem] text-white/45 font-light flex items-center gap-2">
                    <span className="text-gold text-[0.6rem]">✦</span> {d.split(' and ')[0].split(',')[0]}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <button
                  onClick={() => openInquiry(current.title)}
                  data-cursor="START"
                  className="inline-flex items-center gap-2.5 bg-gold text-navy-deep px-7 py-3.5 rounded-sm text-[0.78rem] font-semibold uppercase tracking-[0.12em] hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,169,110,0.3)] transition-all cursor-pointer"
                >
                  Explore {current.short} <ArrowRight size={15} />
                </button>
                <Link to="/services" className="text-[0.75rem] text-white/50 uppercase tracking-[0.15em] hover:text-gold transition-colors">
                  All 13 services →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>
    </section>
  );
}
