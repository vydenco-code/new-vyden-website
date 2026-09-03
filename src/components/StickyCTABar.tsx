import { Phone } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useInquiry } from '../inquiry';
import { SITE } from '../data/site';

export default function StickyCTABar() {
  const openInquiry = useInquiry();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[90] bg-navy-deep border-t border-gold/20 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-around py-3 px-4">
        <a
          href={`tel:${SITE.phoneRaw}`}
          className="flex flex-col items-center gap-0.5 text-white hover:text-gold transition-colors"
        >
          <Phone size={22} className="text-gold" />
          <span className="text-[0.55rem] uppercase tracking-widest font-medium">Call</span>
        </a>
        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-white hover:text-wa-green transition-colors"
        >
          <WhatsAppIcon size={22} className="text-wa-green" />
          <span className="text-[0.55rem] uppercase tracking-widest font-medium">WhatsApp</span>
        </a>
        <button
          onClick={() => openInquiry()}
          className="flex flex-col items-center gap-0.5 text-white hover:text-gold transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center">
            <span className="text-[0.5rem] font-bold text-navy-deep">?</span>
          </div>
          <span className="text-[0.55rem] uppercase tracking-widest font-medium">Ask</span>
        </button>
      </div>
    </div>
  );
}