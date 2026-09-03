import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Briefcase,
  CalendarCheck,
  Check,
  Coffee,
  Compass,
  Crown,
  DraftingCompass,
  Globe,
  Rocket,
  RotateCcw,
  Ruler,
  Send,
  Stamp,
  Store,
  Users,
  Zap,
} from 'lucide-react';
import { useInquiry } from '../inquiry';
import { SITE } from '../data/site';

/* ---------------------------------- data ---------------------------------- */

const goals = [
  { key: 'customers', label: 'More Customers', hint: 'Leads, sales & footfall', icon: Users },
  { key: 'brand', label: 'Stronger Brand', hint: 'Identity, PR & presence', icon: Crown },
  { key: 'automation', label: 'Save Time', hint: 'Automation & software', icon: Bot },
  { key: 'website', label: 'New Website / App', hint: 'Build or rebuild', icon: Globe },
] as const;

const businesses = [
  { key: 'retail', label: 'Retail / Store', hint: 'Footfall & repeat buyers', icon: Store },
  { key: 'cafe', label: 'Café / Restaurant', hint: 'Tables, orders & buzz', icon: Coffee },
  { key: 'services', label: 'Services / Agency', hint: 'Leads & authority', icon: Briefcase },
  { key: 'startup', label: 'Startup / D2C Brand', hint: 'Launch & scale fast', icon: Rocket },
] as const;

const timelines = [
  { key: 'asap', label: 'ASAP', hint: 'Ready to start now', icon: Zap },
  { key: 'month', label: 'This Month', hint: 'Planning ahead', icon: CalendarCheck },
  { key: 'exploring', label: 'Just Exploring', hint: 'Comparing options', icon: Compass },
] as const;

type GoalKey = (typeof goals)[number]['key'];
type BusinessKey = (typeof businesses)[number]['key'];
type TimelineKey = (typeof timelines)[number]['key'];

interface RecommendedService {
  name: string;
  why: string;
  match: number;
}

const recommendations: Record<GoalKey, { title: string; services: RecommendedService[] }> = {
  customers: {
    title: 'A growth engine',
    services: [
      { name: 'Social Media Marketing', why: 'Reels + Meta ads tuned for leads, not just likes.', match: 96 },
      { name: 'Google Business & Local SEO', why: 'Get found first when nearby buyers search.', match: 92 },
      { name: 'Influencer Marketing', why: '500+ local creators driving trial visits.', match: 87 },
    ],
  },
  brand: {
    title: 'A brand people remember',
    services: [
      { name: 'Branding & Public Relations', why: 'Identity + press that makes you the obvious choice.', match: 96 },
      { name: 'Graphic Design & Creative', why: 'Scroll-stopping visuals across every touchpoint.', match: 91 },
      { name: 'Podcast Production', why: 'Authority content that builds trust at scale.', match: 85 },
    ],
  },
  automation: {
    title: 'Your business on autopilot',
    services: [
      { name: 'WhatsApp Automation & AI', why: 'Never miss a lead — instant replies, follow-ups, CRM sync.', match: 97 },
      { name: 'Custom Internal Software', why: 'Tools built around your exact workflow.', match: 93 },
      { name: 'Website Chatbots & AI', why: '24×7 lead capture on your website.', match: 88 },
    ],
  },
  website: {
    title: 'A digital home that sells',
    services: [
      { name: 'Web & App Development', why: 'Fast, conversion-focused sites and apps.', match: 97 },
      { name: 'E-commerce Management', why: 'Marketplace storefronts that rank and convert.', match: 90 },
    ],
  },
};

const businessTips: Record<BusinessKey, string> = {
  retail: 'SITE NOTE — 8 out of 10 retail stores surveyed filled footfall gaps with Maps visibility + Instagram offers.',
  cafe: 'SITE NOTE — 78% of cafés surveyed filled tables fastest with Reels + a review strategy.',
  services: 'SITE NOTE — service firms surveyed closed 2× more deals after pairing reviews with fast follow-ups.',
  startup: 'SITE NOTE — 9 out of 10 D2C launches surveyed scaled fastest by launching lean and tracking everything.',
};

const timelineLines: Record<TimelineKey, string> = {
  asap: 'PRIORITY: RUSH — fastest path to results, drawn first.',
  month: 'PRIORITY: SCHEDULED — the right build order for a month-long rollout.',
  exploring: 'PRIORITY: SURVEY — highest-ROI first move, no commitment needed.',
};

const stepLabels = ['Survey', 'Plot', 'Scale', 'Draft', 'Plan'];

/* -------------------------------- component -------------------------------- */

export default function ServiceFinder() {
  const openInquiry = useInquiry();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<GoalKey | null>(null);
  const [business, setBusiness] = useState<BusinessKey | null>(null);
  const [timeline, setTimeline] = useState<TimelineKey | null>(null);
  const [flashKey, setFlashKey] = useState<string | null>(null);
  const [draftPct, setDraftPct] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Drafting room: count 0→100 then reveal the plan
  useEffect(() => {
    if (step !== 3) return;
    setDraftPct(0);
    const started = Date.now();
    const id = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - started) / 1800) * 100));
      setDraftPct(p);
      if (p >= 100) {
        clearInterval(id);
        timer.current = setTimeout(() => setStep(4), 350);
      }
    }, 40);
    return () => clearInterval(id);
  }, [step]);

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setFlashKey(null);
    setDraftPct(0);
    setStep(0);
    setGoal(null);
    setBusiness(null);
    setTimeline(null);
  };

  const pick = (key: string, commit: () => void) => {
    setFlashKey(key);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setFlashKey(null);
      commit();
    }, 200);
  };

  const moveFocus = (e: KeyboardEvent<HTMLButtonElement>, index: number, total: number) => {
    const cols = 2;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = (index + 1) % total;
    else if (e.key === 'ArrowLeft') next = (index - 1 + total) % total;
    else if (e.key === 'ArrowDown') next = (index + cols) % total;
    else if (e.key === 'ArrowUp') next = (index - cols + total) % total;
    if (next !== null) {
      e.preventDefault();
      const buttons = e.currentTarget.parentElement?.querySelectorAll('button');
      (buttons?.[next] as HTMLButtonElement | undefined)?.focus();
    }
  };

  const result = goal ? recommendations[goal] : null;
  const goalLabel = goals.find((g) => g.key === goal)?.label;
  const businessLabel = businesses.find((b) => b.key === business)?.label;
  const timelineLabel = timelines.find((t) => t.key === timeline)?.label;
  const planNo = goal && business ? `VDN-${goal.slice(0, 2).toUpperCase()}${business.slice(0, 2).toUpperCase()}-047` : 'VDN-XXXX-047';
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const whatsappText =
    goal && business && timeline && result
      ? `Hi Vyden Co.! I used your Service Finder — I'm a ${businessLabel}, I want ${goalLabel?.toLowerCase()} (${timelineLabel}). My plan: ${result.title} (Ref ${planNo}). Let's build it!`
      : 'Hi Vyden Co., I want to know more!';

  /* Spec-sheet option card with corner registration marks */
  const optionCard = (
    code: string,
    key: string,
    label: string,
    hint: string,
    Icon: typeof Users,
    index: number,
    total: number,
    onPick: () => void
  ) => (
    <motion.button
      key={key}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      onClick={() => pick(key, onPick)}
      onKeyDown={(e) => moveFocus(e, index, total)}
      className={`group relative text-left p-6 pt-7 transition-all duration-200 cursor-pointer border outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep ${
        flashKey === key
          ? 'bg-gold/25 border-gold scale-[1.02]'
          : 'bg-white/[0.03] border-white/25 hover:border-gold hover:bg-gold/5 hover:-translate-y-0.5'
      }`}
    >
      {/* corner registration marks */}
      <span aria-hidden="true" className="absolute top-1.5 left-1.5 text-white/55 text-xs leading-none">+</span>
      <span aria-hidden="true" className="absolute top-1.5 right-1.5 text-white/55 text-xs leading-none">+</span>
      <span aria-hidden="true" className="absolute bottom-1.5 left-1.5 text-white/55 text-xs leading-none">+</span>
      <span aria-hidden="true" className="absolute bottom-1.5 right-1.5 text-white/55 text-xs leading-none">+</span>
      <span className="absolute top-2 right-6 text-[0.6rem] tracking-[0.2em] text-white/50 font-mono">{code}</span>

      <span className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`w-10 h-10 border flex items-center justify-center transition-colors ${
            flashKey === key ? 'bg-gold text-navy-deep border-gold' : 'border-white/30 text-gold group-hover:bg-gold group-hover:text-navy-deep group-hover:border-gold'
          }`}
        >
          <Icon size={19} strokeWidth={1.75} />
        </span>
        <ArrowRight
          size={16}
          className={`mt-1 transition-all duration-200 ${
            flashKey === key ? 'opacity-100 translate-x-0 text-gold' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-gold'
          }`}
        />
      </span>
      <span className={`font-serif text-xl transition-colors block mb-1 ${flashKey === key ? 'text-gold' : 'text-white group-hover:text-gold'}`}>
        {label}
      </span>
      <span className="text-[0.75rem] text-white/65 font-light font-mono">{hint}</span>
    </motion.button>
  );

  const pickChip = (label: string, target: number, title: string) => (
    <button
      onClick={() => setStep(target)}
      title={title}
      className="inline-flex items-center gap-2 text-[0.72rem] font-mono text-gold/90 bg-gold/10 border border-dashed border-gold/40 px-4 py-1.5 hover:bg-gold/20 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
    >
      <Check size={13} /> {label} <span className="text-gold/60 underline underline-offset-2">revise</span>
    </button>
  );

  const backBtn = (target: number) => (
    <button
      onClick={() => setStep(target)}
      className="inline-flex items-center gap-2 text-[0.72rem] font-mono text-white/60 uppercase tracking-[0.15em] hover:text-gold transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
    >
      <ArrowLeft size={14} /> Back
    </button>
  );

  return (
    <section className="relative py-24 px-[5%] overflow-hidden bg-navy-deep">
      {/* blueprint grids: fine + major */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:22px_22px]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:110px_110px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/70 pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* header plate */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4 justify-center border border-white/25 px-5 py-2">
            <DraftingCompass size={15} className="text-gold" />
            <span className="text-[0.7rem] font-mono text-white/80 uppercase tracking-[0.25em]">Vyden Drafting Room · Sheet 01</span>
            <Ruler size={15} className="text-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-white leading-tight tracking-tight">
            We Draft Your Growth Plan <em className="italic text-gold-light not-italic">in 30 Seconds.</em>
          </h2>
          <p className="text-[0.78rem] font-mono text-white/60 tracking-[0.15em] mt-3 uppercase">Answer 3 survey lines — watch the drawing build itself</p>
        </div>

        {/* progress rule */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {stepLabels.map((label, i) => {
            const done = step > i;
            const current = step === i;
            const clickable = i < step && step < 4;
            return (
              <button
                key={label}
                disabled={!clickable}
                onClick={() => clickable && setStep(i)}
                title={clickable ? `Back to ${label}` : label}
                className={`group/prog flex flex-col items-center gap-1.5 ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span
                  className={`h-[3px] rounded-full transition-all duration-500 ${done || current ? 'w-10 bg-gold' : 'w-6 bg-white/20'} ${
                    clickable ? 'group-hover/prog:bg-gold-light' : ''
                  }`}
                />
                <span
                  className={`text-[0.58rem] font-mono uppercase tracking-[0.2em] transition-colors ${
                    current ? 'text-gold' : done ? 'text-white/70 group-hover/prog:text-gold' : 'text-white/45'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px] gap-5 items-start">
          {/* main sheet */}
          <div className="relative bg-white/[0.04] border border-white/25 p-8 md:p-10 min-h-[420px] backdrop-blur-[1px]">
            <span aria-hidden="true" className="absolute top-2 left-2 text-white/40 text-sm leading-none">+</span>
            <span aria-hidden="true" className="absolute top-2 right-2 text-white/40 text-sm leading-none">+</span>
            <span aria-hidden="true" className="absolute bottom-2 left-2 text-white/40 text-sm leading-none">+</span>
            <span aria-hidden="true" className="absolute bottom-2 right-2 text-white/40 text-sm leading-none">+</span>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step-0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
                  <p className="text-[0.7rem] font-mono text-gold uppercase tracking-[0.2em] mb-2">Survey line 1 of 3 — FIG. A</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-8">What should this plan achieve?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {goals.map((g, i) =>
                      optionCard(`A-0${i + 1}`, g.key, g.label, g.hint, g.icon, i, goals.length, () => {
                        setGoal(g.key);
                        setStep(1);
                      })
                    )}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step-1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
                  <p className="text-[0.7rem] font-mono text-gold uppercase tracking-[0.2em] mb-2">Survey line 2 of 3 — FIG. B</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">What are we drawing it for?</h3>
                  <div className="flex flex-wrap gap-2 mb-8">{goalLabel && pickChip(goalLabel, 0, 'Revise your goal')}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {businesses.map((b, i) =>
                      optionCard(`B-0${i + 1}`, b.key, b.label, b.hint, b.icon, i, businesses.length, () => {
                        setBusiness(b.key);
                        setStep(2);
                      })
                    )}
                  </div>
                  {backBtn(0)}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step-2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
                  <p className="text-[0.7rem] font-mono text-gold uppercase tracking-[0.2em] mb-2">Survey line 3 of 3 — FIG. C</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">At what scale do we build?</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {goalLabel && pickChip(goalLabel, 0, 'Revise your goal')}
                    {businessLabel && pickChip(businessLabel, 1, 'Revise your business type')}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {timelines.map((t, i) =>
                      optionCard(`C-0${i + 1}`, t.key, t.label, t.hint, t.icon, i, timelines.length, () => {
                        setTimeline(t.key);
                        setStep(3);
                      })
                    )}
                  </div>
                  {backBtn(1)}
                </motion.div>
              )}

              {/* drafting room */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center text-center min-h-[320px]"
                >
                  <svg viewBox="0 0 220 140" className="w-56 h-auto mb-6" fill="none" aria-hidden="true">
                    <motion.rect x="14" y="14" width="192" height="112" stroke="#c9a96e" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: 'easeInOut' }} />
                    <motion.line x1="14" y1="52" x2="206" y2="52" stroke="rgba(255,255,255,0.6)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.3 }} />
                    <motion.line x1="110" y1="52" x2="110" y2="126" stroke="rgba(255,255,255,0.6)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.7 }} />
                    <motion.circle cx="110" cy="89" r="16" stroke="#c9a96e" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.9 }} />
                  </svg>
                  <p className="font-mono text-[0.75rem] text-white/85 uppercase tracking-[0.3em] mb-3">Drafting your plan — {draftPct}%</p>
                  <div className="w-56 h-[3px] bg-white/25 overflow-hidden">
                    <div className="h-full bg-gold transition-all duration-100" style={{ width: `${draftPct}%` }} />
                  </div>
                  <p className="font-mono text-[0.65rem] text-white/55 mt-4 tracking-widest">PLOTTING {planNo} · DO NOT DISTURB THE DRAFTSMAN</p>
                </motion.div>
              )}

              {/* the stamped plan */}
              {step === 4 && result && business && timeline && (
                <motion.div key="step-4" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.4 }}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <p className="text-[0.7rem] font-mono text-gold uppercase tracking-[0.2em]">Approved plan — SHEET 02 / 02</p>
                      <p className="text-[0.7rem] font-mono text-white/55 tracking-[0.15em] mt-1">REF {planNo}</p>
                    </div>
                    {/* approved stamp slam — inline so it can never cover the headline */}
                    <motion.div
                      initial={{ scale: 2.4, opacity: 0, rotate: -4 }}
                      animate={{ scale: 1, opacity: 1, rotate: -12 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 17, delay: 0.9 }}
                      className="border-[3px] border-gold px-4 py-2 bg-navy-deep/60 shrink-0"
                      aria-hidden="true"
                    >
                      <p className="font-mono text-gold text-sm md:text-base font-bold tracking-[0.25em]">APPROVED</p>
                      <p className="font-mono text-gold/80 text-[0.55rem] tracking-[0.3em] text-center">VYDEN · {today}</p>
                    </motion.div>
                  </div>
                  <h3 className="font-serif text-2xl md:text-4xl text-white mb-2 leading-tight">
                    {result.title} <em className="italic text-gold-light not-italic">for your {businessLabel?.toLowerCase()}.</em>
                  </h3>
                  <p className="text-[0.78rem] font-mono text-white/70 tracking-wider mb-6">{timelineLines[timeline]}</p>

                  <div className="space-y-3 mb-6">
                    {result.services.map((service, i) => (
                      <motion.button
                        key={service.name}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.4 + i * 0.14 }}
                        onClick={() => openInquiry(service.name)}
                        className="group w-full text-left border border-white/25 bg-white/[0.03] p-5 hover:border-gold hover:bg-gold/5 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
                      >
                        <span className="flex items-center justify-between gap-3 mb-1.5">
                          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-white/55">DETAIL {i + 1} · SPEC-{result.services.length - i}0{i + 1}</span>
                          <span className="font-mono text-[0.68rem] text-gold tracking-widest">{service.match}% MATCH</span>
                        </span>
                        <span className="font-serif text-lg text-white group-hover:text-gold transition-colors block leading-snug mb-2">
                          {service.name}
                        </span>
                        <span className="block h-[5px] bg-white/20 mb-2 overflow-hidden">
                          <motion.span
                            className="block h-full bg-gold"
                            initial={{ width: 0 }}
                            animate={{ width: `${service.match}%` }}
                            transition={{ duration: 0.8, delay: 0.6 + i * 0.14, ease: 'easeOut' }}
                          />
                        </span>
                        <span className="text-[0.76rem] text-white/65 font-light">{service.why}</span>
                      </motion.button>
                    ))}
                  </div>

                  <p className="text-[0.8rem] font-mono text-gold leading-relaxed border border-dashed border-gold/50 bg-gold/5 p-4 mb-6">
                    {businessTips[business]}
                  </p>

                  {/* title block */}
                  <div className="grid grid-cols-2 md:grid-cols-4 border border-white/25 font-mono text-[0.65rem] mb-8">
                    {[
                      ['PROJECT', result.title],
                      ['CLIENT', businessLabel ?? '—'],
                      ['PRIORITY', timelineLabel ?? '—'],
                      ['DRAWN', `${today} · VYDEN`],
                    ].map(([k, v]) => (
                      <div key={k} className="border-white/25 border-r last:border-r-0 p-3 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r">
                        <p className="text-white/55 tracking-[0.2em] mb-1">{k}</p>
                        <p className="text-white leading-snug">{v}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    <button
                      onClick={() => openInquiry(result.services[0].name)}
                      data-cursor="START"
                      className="inline-flex items-center gap-2.5 bg-gold text-navy-deep px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.12em] hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,169,110,0.3)] transition-all cursor-pointer"
                    >
                      <Stamp size={16} /> Commission This Build
                    </button>
                    <a
                      href={`${SITE.whatsappUrl}?text=${encodeURIComponent(whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[0.75rem] font-mono text-white/60 uppercase tracking-[0.12em] hover:text-gold transition-colors"
                    >
                      <Send size={14} /> Discuss on WhatsApp
                    </a>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 text-[0.75rem] font-mono text-white/60 uppercase tracking-[0.12em] hover:text-gold transition-colors cursor-pointer"
                    >
                      <RotateCcw size={14} /> Redraw
                    </button>
                  </div>

                  {/* approved stamp slam */}
                  <motion.div
                    initial={{ scale: 2.4, opacity: 0, rotate: -18 }}
                    animate={{ scale: 1, opacity: 1, rotate: -12 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 17, delay: 0.9 }}
                    className="pointer-events-none absolute -top-3 right-2 md:right-6 border-[3px] border-gold px-4 py-2 bg-navy-deep/60"
                    aria-hidden="true"
                  >
                    <p className="font-mono text-gold text-sm md:text-base font-bold tracking-[0.25em]">APPROVED</p>
                    <p className="font-mono text-gold/70 text-[0.55rem] tracking-[0.3em] text-center">VYDEN · {today}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* live drawing log — the profile that builds itself */}
          <aside className="bg-navy-mid/70 border border-white/25 p-6 backdrop-blur-[1px] lg:sticky lg:top-28">
            <p className="font-mono text-[0.65rem] text-gold uppercase tracking-[0.25em] mb-1">Drawing log</p>
            <p className="font-mono text-[0.6rem] text-white/35 tracking-[0.2em] mb-5">REF {planNo}</p>
            <div className="space-y-4 font-mono text-[0.75rem]">
              {[
                { n: '01', k: 'OBJECTIVE', v: goalLabel },
                { n: '02', k: 'SITE', v: businessLabel },
                { n: '03', k: 'SCALE', v: timelineLabel },
              ].map((row) => (
                <div key={row.n} className="border-b border-dashed border-white/15 pb-3">
                  <p className="text-white/35 tracking-[0.2em] text-[0.62rem] mb-1">
                    {row.n} · {row.k}
                  </p>
                  <AnimatePresence mode="wait">
                    {row.v ? (
                      <motion.p
                        key={row.v}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                        className="text-gold leading-snug"
                      >
                        ✓ {row.v}
                      </motion.p>
                    ) : (
                      <motion.p key="blank" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white/25">
                        — awaiting survey —
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 font-mono text-[0.62rem] text-white/35 tracking-[0.15em]">
              <span className={`w-1.5 h-1.5 rounded-full ${step >= 4 ? 'bg-gold' : 'bg-white/25 animate-pulse'}`} />
              {step >= 4 ? 'PLAN ISSUED' : step === 3 ? 'DRAFTING…' : 'SURVEY IN PROGRESS'}
            </div>
          </aside>
        </div>

        <p className="text-center text-[0.68rem] font-mono text-white/35 tracking-[0.15em] mt-8">
          FREE · NO SIGNUP · 30 SECONDS · DRAWN AROUND YOUR ANSWERS
        </p>
      </div>
    </section>
  );
}
