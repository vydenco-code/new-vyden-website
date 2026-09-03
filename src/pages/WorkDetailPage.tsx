import { motion } from 'motion/react';
import { ArrowLeft, Phone } from 'lucide-react';
import { Link } from '../router';
import { useInquiry } from '../inquiry';
import { getClientBySlug } from '../data/clients';
import SectionHeader from '../components/SectionHeader';
import NotFoundPage from './NotFoundPage';
import { usePageMeta } from '../hooks/usePageMeta';

export default function WorkDetailPage({ slug }: { slug: string }) {
  const openInquiry = useInquiry();
  const project = getClientBySlug(slug);
  usePageMeta(
    project ? `${project.title} — Case Study` : 'Case Study Not Found',
    project?.description
  );

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep pt-36 pb-16 px-[5%] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="relative z-10">
          <Link 
            to="/work" 
            className="inline-flex items-center gap-2 text-[0.72rem] text-white/50 uppercase tracking-[0.15em] hover:text-gold transition-colors mb-10"
          >
            <ArrowLeft size={14} /> All Work
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-[0.68rem] font-semibold text-gold uppercase tracking-[0.22em] border border-gold/40 rounded-sm px-4 py-1.5 mb-6">{project.tag}</span>
              <h1 className="font-serif text-4xl md:text-6xl font-light text-white leading-tight tracking-tight mb-5">{project.title}</h1>
              <p className="text-lg text-white/65 leading-relaxed max-w-xl font-light">{project.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hidden lg:block"
            >
              <div className="group relative bg-white h-64 flex items-center justify-center overflow-hidden rounded-sm shadow-2xl">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                {project.logoUrl ? (
                  <img
                    src={project.logoUrl}
                    alt={`${project.title} Client Logo`}
                    className="h-32 w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                    decoding="async"
                    width="256"
                    height="128"
                  />
                ) : (
                  <span className="font-serif text-3xl font-bold text-navy-deep/25 tracking-tight uppercase relative z-10">{project.logo}</span>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold z-20"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-off-white py-24 px-[5%]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <SectionHeader
              label="What We Delivered"
              title={<>The Work, In <em className="italic text-navy-mid not-italic">Detail</em></>}
            />
          </div>

          <div className="space-y-3">
            {project.results.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex items-start gap-4 bg-white border-l-[3px] border-gold p-5 rounded-r-sm shadow-sm"
              >
                <span className="font-serif text-gold font-semibold text-lg leading-none mt-0.5 w-8 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-[0.9rem] text-slate-600 leading-relaxed font-light">{result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deep py-20 px-[5%] text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-normal text-white leading-tight tracking-tight mb-4">
          Want Results Like These<br /><em className="italic text-gold not-italic">For Your Brand?</em>
        </h2>
        <p className="text-base text-white/50 leading-relaxed max-w-xl mx-auto mb-9 font-light">
          Tell us where your business is today and where you want it to go. We'll show you how we'd get you there.
        </p>
        <button 
          onClick={() => openInquiry()}
          className="inline-flex items-center gap-2.5 bg-gold text-navy-deep px-8 py-4 rounded-sm text-[0.8rem] font-semibold uppercase tracking-[0.12em] hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,169,110,0.3)] transition-all cursor-pointer"
        >
          <Phone size={17} />
          Schedule a Callback
        </button>
      </section>
    </>
  );
}
