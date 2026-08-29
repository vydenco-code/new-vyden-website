import { Link } from '../router';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFoundPage() {
  usePageMeta('Page Not Found');

  return (
    <section className="bg-navy-deep min-h-[80vh] flex flex-col items-center justify-center px-[5%] text-center pt-24">
      <span className="font-serif text-7xl md:text-8xl font-light text-gold/40 tracking-tight mb-6">404</span>
      <h1 className="font-serif text-3xl md:text-4xl font-normal text-white leading-tight tracking-tight mb-4">
        This Page Took a<br /><em className="italic text-gold not-italic">Different Route.</em>
      </h1>
      <p className="text-base text-white/50 leading-relaxed max-w-md mb-10 font-light">
        The page you're looking for doesn't exist or has moved. Let's get you back on track.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2.5 bg-gold text-navy-deep px-8 py-4 rounded-sm text-[0.8rem] font-semibold uppercase tracking-[0.12em] hover:bg-gold-light hover:-translate-y-0.5 transition-all"
      >
        Back to Home
      </Link>
    </section>
  );
}
