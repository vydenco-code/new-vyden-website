import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Fingerprint } from 'lucide-react';
import { useInquiry } from '../inquiry';
import { servicesData } from '../data/services';
import type { Service } from '../data/services';

export default function Services() {
  const [activeServiceIndex, setActiveServiceIndex] = React.useState<number | null>(null);

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
          <span className="lg:hidden">Explore our core services. Hold for 0.5 seconds on any card to see detailed offerings and inquire now.</span>
          <span className="hidden lg:inline">Explore our core services. Match the cursor key with the unlock icon on any card to see detailed offerings and inquire now.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {servicesData.map((service, index) => (
          <ServiceCard 
            key={service.title} 
            service={service} 
            index={index} 
            isActive={activeServiceIndex === index}
            onToggle={() => setActiveServiceIndex(activeServiceIndex === index ? null : index)}
            onClose={() => setActiveServiceIndex(null)}
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
  key?: string | number;
}

function ServiceCard({ service, index, isActive, onToggle, onClose }: ServiceCardProps) {
  const openInquiry = useInquiry();
  const scrollRef = React.useRef<HTMLUListElement>(null);
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const holdTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const justUnlockedRef = React.useRef(false);

  React.useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (isActive && scrollRef.current) {
      // Small scroll nudge to show it's scrollable on mobile
      const el = scrollRef.current;
      setTimeout(() => {
        el.scrollTo({ top: 20, behavior: 'smooth' });
        setTimeout(() => {
          el.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
      }, 300);
    }
  }, [isActive]);

  const handleTouchStart = () => {
    holdTimerRef.current = setTimeout(() => {
      setIsUnlocked(true);
      justUnlockedRef.current = true;
      setTimeout(() => {
        justUnlockedRef.current = false;
      }, 500);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const handleClick = () => {
    if (justUnlockedRef.current) return;
    if (isUnlocked || isActive) {
      setIsUnlocked(false);
      onClose();
    }
  };

  const showDetails = isActive || isUnlocked;

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={handleClick}
      onMouseLeave={() => {
        setIsUnlocked(false);
        onClose();
      }}
      className={`relative bg-white/5 border border-white/10 rounded-sm p-9 min-h-[260px] flex flex-col overflow-hidden transition-all hover:border-gold ${showDetails ? 'border-gold -translate-y-1' : ''}`}
    >
      {/* Hover/Active Background */}
      <div className={`absolute inset-0 bg-gradient-to-br from-navy-mid to-navy-light transition-opacity duration-400 z-0 ${showDetails ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Preview Content */}
      <div className={`relative z-10 flex-grow flex flex-col items-center justify-center text-center transition-all duration-300 ${showDetails ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        <h3 className="font-serif text-xl font-semibold text-white mb-3 leading-tight">{service.title}</h3>
        <p className="text-[0.82rem] text-white/50 leading-relaxed font-light mb-6">{service.description}</p>
        
        {/* Lock Icon */}
        <div 
          className="mt-auto flex flex-col items-center justify-center cursor-pointer group/lock select-none"
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') {
              setIsUnlocked(true);
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onContextMenu={(e) => e.preventDefault()}
          style={{ WebkitTouchCallout: 'none' }}
        >
          {/* Desktop Unlock Icon */}
          <div className="hidden lg:flex relative items-center justify-center w-8 h-8 border-2 border-dashed border-white/30 rounded-full transition-all duration-300 group-hover/lock:border-gold group-hover/lock:scale-110">
            <div className="w-2 h-2 bg-white/30 rounded-full transition-colors duration-300 group-hover/lock:bg-gold"></div>
          </div>
          <span className="hidden lg:block text-[0.6rem] text-white/30 uppercase tracking-widest mt-2 transition-colors duration-300 group-hover/lock:text-gold">Unlock</span>

          {/* Mobile Fingerprint Icon */}
          <div className="lg:hidden flex flex-col items-center justify-center transition-all duration-300 group-hover/lock:text-gold text-white/30">
            <Fingerprint size={32} strokeWidth={1.5} />
            <span className="text-[0.6rem] uppercase tracking-widest mt-2">Hold</span>
          </div>
        </div>
      </div>

      {/* Detail Content (Revealed on Hover/Active) */}
      <div className={`absolute inset-0 p-7 transition-all duration-300 z-20 flex flex-col ${showDetails ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        <h3 className="font-serif text-lg font-semibold text-gold mb-3.5 leading-tight">{service.title}</h3>
        <ul 
          ref={scrollRef}
          className="space-y-2 mb-6 overflow-y-auto custom-scrollbar flex-grow"
        >
          {service.details.map((detail, i) => (
            <li key={i} className="text-[0.75rem] text-white/75 flex items-start gap-2 leading-relaxed font-light">
              <span className="text-gold mt-0.5 flex-shrink-0">—</span>
              {detail}
            </li>
          ))}
        </ul>
        {/* Mobile Scroll Indicator */}
        {isActive && (
          <div className="lg:hidden flex justify-center mb-2 animate-bounce opacity-50">
            <div className="w-1 h-4 bg-gold/30 rounded-full"></div>
          </div>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            openInquiry(service.title);
          }}
          className="mt-auto inline-flex items-center justify-center gap-2 bg-gold text-navy-deep py-2.5 rounded-sm text-[0.7rem] font-bold uppercase tracking-widest hover:bg-gold-light transition-colors cursor-pointer"
        >
          Inquire Now <ExternalLink size={12} />
        </button>
      </div>
    </motion.article>
  );
}
