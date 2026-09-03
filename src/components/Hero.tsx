import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Phone } from 'lucide-react';
import { Link } from '../router';
import { useInquiry } from '../inquiry';
import HeroTicker from './HeroTicker';

const services = [
  "Social Media Marketing",
  "Google Business & Local SEO",
  "Branding & Public Relations",
  "Podcast Production",
  "WhatsApp Automation & AI",
  "Web & App Development",
  "Influencer Marketing",
  "Graphic Design & Creative",
  "Outdoor Advertising"
];

// Duplicate services for infinite scroll effect
const extendedServices = [...services, ...services, ...services];

const lineReveal = (delay: number) => ({
  initial: { y: '110%' },
  animate: { y: '0%' },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const openInquiry = useInquiry();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-[100dvh] flex items-center px-[5%] pt-28 pb-16 overflow-hidden bg-navy-deep">
      {/* Background Elements */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-deep to-navy-mid"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Soft floating glows — navy shades only */}
        <motion.div
          aria-hidden="true"
          className="absolute -top-24 right-[8%] w-[420px] h-[420px] rounded-full bg-navy-light/25 blur-[140px]"
          animate={{ y: [0, -24, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-[-120px] left-[-80px] w-[380px] h-[380px] rounded-full bg-navy-mid/80 blur-[120px]"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span aria-hidden="true" className="absolute -bottom-10 right-0 font-serif font-bold text-[26vw] lg:text-[19rem] leading-none text-stroke-gold opacity-70 select-none pointer-events-none">
          VYDEN
        </span>
      </motion.div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.19fr_0.81fr] gap-8 lg:gap-12 items-center">
        <div className="max-w-[880px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-8 h-[1px] bg-gold origin-left"
            ></motion.div>
            <span className="text-[0.72rem] font-medium text-gold uppercase tracking-[0.25em]">Vyden Your Horizons</span>
          </motion.div>

          <h1 className="hero-heading font-serif text-[10vw] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[3.5rem] xl:text-[4.8rem] 2xl:text-[5.6rem] whitespace-nowrap font-light text-white leading-[1.08] tracking-tight mb-6">
            <span className="block overflow-hidden pb-1">
              <motion.span className="block" {...lineReveal(0.35)}>We Build Brands.</motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span className="block" {...lineReveal(0.47)}>
                We Drive <em className="not-italic bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">Growth.</em>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span className="block" {...lineReveal(0.59)}>We Shape Futures.</motion.span>
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="text-lg text-white/70 leading-relaxed max-w-[580px] mb-8 font-light"
          >
            Looking for the <strong className="text-gold font-normal">best digital marketing agency for your brand?</strong> Vyden Co. is a premium full-service marketing & software solutions company powered by AI, data, and relentless ambition. From strategy to execution — we deliver measurable results at scale.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={() => openInquiry()}
              className="group/btn relative overflow-hidden inline-flex items-center gap-2.5 bg-gold text-navy-deep px-7 py-3.5 rounded-sm text-[0.8rem] font-semibold uppercase tracking-[0.12em] hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,169,110,0.3)] transition-all cursor-pointer"
            >
              <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" aria-hidden="true"></span>
              <Phone size={18} className="relative z-10" />
              <span className="relative z-10">Schedule a Callback</span>
            </button>
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2.5 bg-transparent text-white border border-white/25 px-7 py-3.5 rounded-sm text-[0.8rem] font-medium uppercase tracking-[0.12em] hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all"
            >
              Explore Services
            </Link>
          </motion.div>

          <HeroTicker />

        </div>

        {/* Vertical Scrolling Carousel */}
        <div className="hidden lg:block relative h-[500px] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-navy-deep via-transparent to-navy-deep"></div>
          <motion.div 
            className="flex flex-col gap-6 w-[115%] will-change-transform"
            animate={{
              y: [0, -1000]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {extendedServices.map((service, idx) => (
              <Link 
                key={idx} 
                to="/services"
                className="bg-navy-mid/60 border border-white/10 backdrop-blur-sm p-6 rounded-sm hover:border-gold/60 hover:shadow-[0_8px_30px_rgba(201,169,110,0.15)] transition-all group cursor-pointer"
              >
                <span className="text-gold/40 text-[0.6rem] uppercase tracking-widest mb-2 block group-hover:text-gold transition-colors">Vyden Co. Services</span>
                <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">{service}</h3>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/40 hover:text-gold transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="block w-[1px] h-10 bg-white/15 relative overflow-hidden">
          <motion.span
            className="absolute top-0 left-0 w-full h-1/2 bg-gold"
            animate={{ y: ['-100%', '220%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>

    </section>
  );
}
