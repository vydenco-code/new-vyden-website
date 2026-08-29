import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../router';
import { getPublishedClients } from '../data/clients';
import PageHeader from '../components/PageHeader';
import { usePageMeta } from '../hooks/usePageMeta';

export default function WorkPage() {
  const clients = getPublishedClients();
  usePageMeta('Our Work', 'Case studies from Vyden Co. — social media growth, influencer campaigns, brand identity and marketing that drives real footfall.');

  return (
    <>
      <PageHeader
        label="Our Work"
        title={<>Brands We've Built<br /><em className="italic text-gold not-italic">And Grown.</em></>}
        description="We partner with brands across industries to drive measurable growth, strengthen brand identity, and build high-impact marketing campaigns. Here's a closer look at that work."
      />

      <section className="bg-navy-mid py-24 px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((project, index) => (
            <motion.article 
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/work/${project.slug}`} className="block h-full bg-white/5 rounded-sm overflow-hidden transition-all hover:bg-white/10 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
                <div className="h-48 bg-white relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  
                  {project.logoUrl ? (
                    <img 
                      src={project.logoUrl} 
                      alt={`${project.title} Client Logo`} 
                      className="h-24 w-auto object-contain relative z-10"
                      loading="lazy"
                      decoding="async"
                      width="200"
                      height="96"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 relative z-10">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                        <span className="text-slate-300 text-[0.6rem] uppercase tracking-widest font-bold">Logo</span>
                      </div>
                      <span className="font-serif text-xl font-bold text-navy-deep/20 tracking-tight uppercase">{project.logo}</span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold z-20"></div>
                </div>
                <div className="p-8">
                  <span className="inline-block text-[0.65rem] font-semibold text-gold uppercase tracking-[0.2em] mb-3">{project.tag}</span>
                  <h3 className="font-serif text-2xl font-semibold text-white mb-2.5">{project.title}</h3>
                  <p className="text-[0.82rem] text-white/50 leading-relaxed mb-5 font-light">{project.description}</p>
                  <ul className="space-y-2 mb-6">
                    {project.results.slice(0, 4).map((result, i) => (
                      <li key={i} className="text-[0.78rem] text-white/65 flex items-start gap-2 leading-relaxed font-light">
                        <span className="text-gold text-[0.6rem] mt-1.5 flex-shrink-0">✦</span>
                        {result}
                      </li>
                    ))}
                    {project.results.length > 4 && (
                      <li className="text-[0.78rem] text-gold flex items-center gap-2 leading-relaxed font-light pt-1">
                        +{project.results.length - 4} more — view details
                      </li>
                    )}
                  </ul>
                  <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-gold uppercase tracking-widest font-medium">
                    View Case Study <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
