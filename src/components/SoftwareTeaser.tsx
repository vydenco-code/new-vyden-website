import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../router';

const tools = [
  'Lead-Tracking CRM',
  'Inventory Systems',
  'WhatsApp Automation Dashboards',
  'Booking & Appointment Systems',
  'Custom Sheets & Internal Jobs'
];

export default function SoftwareTeaser() {
  return (
    <section className="bg-white py-24 px-[5%]">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-gold"></div>
            <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">Beyond Marketing</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-navy-deep leading-tight tracking-tight mb-5">
            We Also Build the Software<br /><em className="italic text-navy-mid not-italic">Your Business Runs On.</em>
          </h2>
          <p className="text-[0.98rem] text-slate-600 leading-relaxed font-light mb-8 max-w-lg">
            Every business has its own way of working — and off-the-shelf tools rarely fit. That's why we design and build custom internal software around your exact process: from tracking leads and stock to automating daily jobs that eat your team's time.
          </p>
          <Link 
            to="/software"
            className="inline-flex items-center gap-2.5 bg-navy-deep text-white px-7 py-3.5 rounded-sm text-[0.8rem] font-semibold uppercase tracking-[0.12em] hover:bg-navy-mid hover:-translate-y-0.5 transition-all"
          >
            Explore Custom Software <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {tools.map((tool, index) => (
            <div 
              key={tool}
              className={`bg-off-white border-l-[3px] border-gold p-6 flex items-start gap-3 ${index === tools.length - 1 ? 'sm:col-span-2' : ''}`}
            >
              <span className="text-gold text-[0.6rem] mt-1.5 flex-shrink-0">✦</span>
              <span className="font-serif text-lg text-navy-deep leading-snug">{tool}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
