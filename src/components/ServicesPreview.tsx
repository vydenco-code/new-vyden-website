import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../router';

const previews = [
  {
    title: 'Social Media Marketing',
    description: 'High-converting campaigns that drive engagement, awareness, and measurable growth.'
  },
  {
    title: 'Google Business & Local SEO',
    description: 'Dominate local search and Google Maps with optimized profiles and proven SEO strategies.'
  },
  {
    title: 'Branding & Public Relations',
    description: 'Brand identities and PR management that build lasting authority across platforms.'
  },
  {
    title: 'WhatsApp Automation & AI',
    description: 'Automate conversations, nurture leads, and convert faster with smart systems.'
  },
  {
    title: 'Web & App Development',
    description: 'Fast, scalable websites and apps built to convert traffic into revenue.'
  },
  {
    title: 'Custom Internal Software',
    description: 'CRMs, inventory systems, dashboards and internal tools built around your exact workflow.',
    href: '/software'
  }
];

export default function ServicesPreview() {
  return (
    <section className="bg-navy-deep py-24 px-[5%]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-gold"></div>
            <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">What We Do</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-white leading-tight tracking-tight">
            Marketing &<br /><em className="italic text-gold not-italic">Technology</em>, Under One Roof
          </h2>
        </div>
        <Link 
          to="/services"
          className="inline-flex items-center gap-2 self-start md:self-auto bg-transparent text-gold border border-gold/40 px-6 py-3 rounded-sm text-[0.75rem] font-medium uppercase tracking-[0.12em] hover:bg-gold hover:text-navy-deep transition-all"
        >
          View All Services <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {previews.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            {item.href ? (
              <Link
                to={item.href}
                className="block group h-full bg-white/5 border border-gold/30 rounded-sm p-8 transition-all hover:border-gold hover:-translate-y-1"
              >
                <span className="text-[0.62rem] font-semibold text-gold uppercase tracking-[0.2em] block mb-3">New · For Businesses</span>
                <h3 className="font-serif text-xl font-semibold text-white mb-2.5 group-hover:text-gold transition-colors">{item.title}</h3>
                <p className="text-[0.82rem] text-white/50 leading-relaxed font-light">{item.description}</p>
                <span className="inline-flex items-center gap-1.5 mt-5 text-[0.7rem] text-gold uppercase tracking-widest font-medium">
                  Learn More <ArrowRight size={13} />
                </span>
              </Link>
            ) : (
              <Link
                to="/services"
                className="block group h-full bg-white/5 border border-white/10 rounded-sm p-8 transition-all hover:border-gold/50 hover:-translate-y-1"
              >
                <h3 className="font-serif text-xl font-semibold text-white mb-2.5 group-hover:text-gold transition-colors">{item.title}</h3>
                <p className="text-[0.82rem] text-white/50 leading-relaxed font-light">{item.description}</p>
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
