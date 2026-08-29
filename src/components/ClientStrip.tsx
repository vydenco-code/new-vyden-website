import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../router';
import { getPublishedClients } from '../data/clients';

export default function ClientStrip() {
  const clients = getPublishedClients();

  return (
    <section className="bg-off-white py-20 px-[5%]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-gold"></div>
            <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">Trusted By</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-navy-deep leading-tight tracking-tight">
            Brands That <em className="italic text-navy-mid not-italic">Grow With Us</em>
          </h2>
        </div>
        <Link 
          to="/work"
          className="inline-flex items-center gap-2 self-start md:self-auto text-[0.75rem] font-medium uppercase tracking-[0.12em] text-navy-deep border-b border-gold pb-1 hover:text-gold transition-colors"
        >
          See Our Work <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {clients.map((client, index) => (
          <motion.div
            key={client.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <Link to={`/work/${client.slug}`} className="block group">
              <div className="relative bg-white h-32 flex items-center justify-center overflow-hidden border border-slate-100 group-hover:border-gold/60 transition-all group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_rgba(13,30,51,0.08)]">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                {client.logoUrl ? (
                  <img 
                    src={client.logoUrl} 
                    alt={`${client.title} Client Logo`} 
                    className="h-14 w-auto object-contain relative z-10"
                    loading="lazy"
                    decoding="async"
                    width="140"
                    height="56"
                  />
                ) : (
                  <span className="font-serif text-xl font-bold text-navy-deep/30 tracking-tight uppercase relative z-10">{client.logo}</span>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20"></div>
              </div>
              <p className="text-[0.68rem] text-slate-400 uppercase tracking-widest mt-3 text-center group-hover:text-gold transition-colors">{client.tag}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
