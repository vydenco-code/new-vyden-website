import { useEffect, useState } from 'react';
import { useRouter } from '../router';

const STOPS: Array<[string, string]> = [
  ['home', 'HERO'],
  ['stats', 'PROOF'],
  ['story', 'STORY'],
  ['dna', 'DNA'],
  ['orbit', 'ORBIT'],
  ['growth-engine', 'ENGINE'],
  ['finder', 'FINDER'],
  ['contact', 'GROW'],
];

// Minimal orientation rail for the homepage (desktop): VYDEN 03 / 08 — STORY.
export default function SectionProgress() {
  const { path } = useRouter();
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (path !== '/') {
      setCount(0);
      return;
    }
    const els = STOPS.map(([id]) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    );
    setCount(els.length);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = els.indexOf(entry.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: '-42% 0px -42% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  if (path !== '/' || count < 2) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 mix-blend-difference text-white"
    >
      <span className="font-serif text-lg leading-none">V</span>
      <span className="font-mono text-[0.62rem] tracking-[0.2em]">
        {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </span>
      <span className="w-[1px] h-14 bg-white/30 relative overflow-hidden">
        <span
          className="absolute inset-0 bg-white origin-top transition-transform duration-500"
          style={{ transform: `scaleY(${(active + 1) / count})` }}
        />
      </span>
      <span className="font-mono text-[0.58rem] tracking-[0.3em] [writing-mode:vertical-rl]">
        {STOPS[active]?.[1] ?? ''}
      </span>
    </div>
  );
}
