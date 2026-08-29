import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Link } from '../router';
import { useInquiry } from '../inquiry';

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

export default function Hero() {
  const openInquiry = useInquiry();

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center px-[5%] pt-28 pb-16 overflow-hidden bg-navy-deep">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/95 to-navy-mid/20"></div>
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.19fr_0.81fr] gap-8 lg:gap-12 items-center">
        <div className="max-w-[850px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <div className="w-8 h-[1px] bg-gold"></div>
            <span className="text-[0.72rem] font-medium text-gold uppercase tracking-[0.25em]">Vyden Your Horizons</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-heading font-serif text-[8.8vw] sm:text-[3.2rem] md:text-[4rem] lg:text-[3.36rem] xl:text-[4.4rem] 2xl:text-[5.2rem] whitespace-nowrap font-light text-white leading-[1.1] tracking-tight mb-5"
          >
            We Build Brands.<br />We Drive <em className="italic text-gold not-italic">Growth.</em><br />We Shape Futures.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/65 leading-relaxed max-w-[560px] mb-8 font-light"
          >
            Looking for the <strong className="text-gold font-normal">best digital marketing agency for your brand </strong>? Vyden Co. is a premium full-service digital marketing and growth agency powered by AI, data, and relentless ambition. From strategy to execution — we deliver measurable results at scale.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={() => openInquiry()}
              className="inline-flex items-center gap-2.5 bg-gold text-navy-deep px-7 py-3.5 rounded-sm text-[0.8rem] font-semibold uppercase tracking-[0.12em] hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,169,110,0.3)] transition-all cursor-pointer"
            >
              <Phone size={18} />
              Schedule a Callback
            </button>
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2.5 bg-transparent text-white border border-white/25 px-7 py-3.5 rounded-sm text-[0.8rem] font-medium uppercase tracking-[0.12em] hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all"
            >
              Explore Services
            </Link>
          </motion.div>
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
                className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-sm hover:border-gold/50 transition-colors group cursor-pointer"
              >
                <span className="text-gold/40 text-[0.6rem] uppercase tracking-widest mb-2 block group-hover:text-gold transition-colors">Vyden Co. Services</span>
                <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">{service}</h3>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
