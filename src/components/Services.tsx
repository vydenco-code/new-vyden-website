import React from 'react';
import { ExternalLink, Fingerprint, ChevronRight } from 'lucide-react';
import { useInquiry } from '../inquiry';
import { servicesData } from '../data/services';
import type { Service } from '../data/services';
import Spotlight from './Spotlight';
import { useSpotlight } from '../hooks/useSpotlight';

const relatedMap: Record<string, string[]> = {
  'Social Media Marketing': ['Content Strategy', 'Community Management', 'Social Listening', 'Influencer Outreach'],
  'Google Business & Local SEO': ['Website SEO Audit', 'Content Marketing', 'Local Citations', 'Review Management'],
  'Branding & Public Relations': ['Brand Guidelines', 'Media Kit Design', 'Crisis Communication', 'Thought Leadership'],
  'Podcast Production': ['Podcast Strategy', 'Guest Booking', 'Show Notes & Transcripts', 'Cross-Platform Repurposing'],
  'WhatsApp Automation & AI': ['CRM Integration', 'Lead Scoring', 'Funnel Automation', 'Multi-Agent Workflows'],
  'Web & App Development': ['Landing Pages', 'Web Apps', 'API Development', 'Cloud Hosting & DevOps'],
  'Influencer Marketing': ['Affiliate Programs', 'Brand Ambassadorships', 'Product Seeding', 'Influencer Analytics'],
  'Graphic Design & Creative': ['Motion Graphics', 'UI/UX Design', 'Presentation Design', 'Annual Report Design'],
  'Outdoor Advertising': ['Transit Branding', 'Retail Signage', 'Gantry Advertising', 'Van Branding'],
  'Event Management & Activations': ['Exhibition Stalls', 'Photography & Videography', 'Merchandise', 'Virtual Events'],
  'E-commerce Management': ['Product Photography', 'Catalog Management', 'Inventory Planning', 'Marketplace SEO'],
  'Email & SMS Marketing': ['Landing Page Design', 'A/B Testing', 'Deliverability Optimization', 'Newsletter Design'],
  'Website Chatbots & AI': ['Voice AI Assistants', 'Knowledge Base Setup', 'Multi-Language Bots', 'Analytics Dashboards'],
};

export default function Services() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <section id="services" className="bg-navy-deep py-24 px-[5%]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-gold"></div>
            <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">What We Do</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-white leading-tight tracking-tight">
            Digital Marketing &<br /><em className="italic text-gold not-italic">Technology Services</em>
          </h2>
        </div>
        <p className="text-base text-white/50 leading-relaxed max-w-sm font-light">
          <span className="lg:hidden">Tap any card to explore its full scope and inquire.</span>
          <span className="hidden lg:inline">Hover any card to explore its full scope and services.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
        {servicesData.map((service, index) => (
          <ServiceCard 
            key={service.title} 
            service={service} 
            index={index} 
            isActive={activeIndex === index}
            onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
            onClose={() => setActiveIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
  isActive: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function ServiceCard({ service, index, isActive, onToggle, onClose }: ServiceCardProps) {
  const openInquiry = useInquiry();
  const { ref, pos, onMouseMove } = useSpotlight<HTMLDivElement>();
  const holdTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const related = relatedMap[service.title] || [];

  React.useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => onClose(), 200);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleTouchStart = () => {
    holdTimerRef.current = setTimeout(() => {
      onToggle();
    }, 500);
  };

  const handleTouchEnd = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const handleClick = () => {
    onToggle();
  };

  return (
    <div ref={cardRef} className="relative">
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { if (window.matchMedia('(min-width: 1024px)').matches) scheduleClose(); }}
        onClick={handleClick}
        onContextMenu={(e) => e.preventDefault()}
        className={`group relative rounded-sm transition-all duration-500 ease-out ${
          isActive
            ? 'z-30 border-gold bg-gradient-to-br from-navy-mid to-navy-light border shadow-[0_16px_60px_rgba(0,0,0,0.5)]'
            : 'z-10 border-white/10 bg-white/5 border hover:border-gold/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
        }`}
      >
        <Spotlight x={pos.x} y={pos.y} />

        {!isActive && (
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-9 min-h-[260px]">
            <h3 className="font-serif text-xl font-semibold text-white mb-3 leading-tight">{service.title}</h3>
            <p className="text-[0.82rem] text-white/50 leading-relaxed font-light mb-6">{service.description}</p>
            <div className="mt-auto flex flex-col items-center justify-center select-none">
              <div
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') {
                    cancelClose();
                    onToggle();
                  }
                }}
                className="hidden lg:flex relative items-center justify-center w-12 h-12 border-2 border-dashed border-white/30 rounded-full transition-all duration-300 hover:border-gold hover:scale-110 cursor-pointer"
              >
                <div className="w-2 h-2 bg-white/30 rounded-full transition-colors duration-300 hover:bg-gold"></div>
              </div>
              <span className="hidden lg:block text-[0.6rem] text-white/30 uppercase tracking-widest mt-2">Unlock</span>
              <div className="lg:hidden flex flex-col items-center justify-center text-white/30">
                <Fingerprint size={32} strokeWidth={1.5} />
                <span className="text-[0.6rem] uppercase tracking-widest mt-2">Hold</span>
              </div>
            </div>
          </div>
        )}

        {isActive && (
          <div className="relative z-10 p-9">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-[1px] bg-gold/50"></div>
              <span className="text-[0.6rem] font-medium text-gold uppercase tracking-[0.2em]">Our Offerings</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-gold mb-4 leading-tight">{service.title}</h3>
            
            <ul className="space-y-2.5 mb-5">
              {service.details.map((detail, i) => (
                <li key={i} className="text-[0.78rem] text-white/70 flex items-start gap-2.5 leading-relaxed font-light">
                  <span className="text-gold mt-1 flex-shrink-0 text-[0.5rem]">&#9670;</span>
                  {detail}
                </li>
              ))}
            </ul>

            {related.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                  <span className="text-[0.58rem] font-medium text-gold/60 uppercase tracking-[0.2em] whitespace-nowrap">What Else We Can Do</span>
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {related.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[0.65rem] text-white/45 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 font-light hover:text-gold hover:border-gold/30 transition-colors cursor-default"
                    >
                      <ChevronRight size={8} className="text-gold/50" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={(e) => { e.stopPropagation(); openInquiry(service.title); }}
              data-cursor="START"
              className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy-deep py-3 rounded-sm text-[0.72rem] font-bold uppercase tracking-widest hover:bg-gold-light transition-colors cursor-pointer"
            >
              Inquire Now <ExternalLink size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
