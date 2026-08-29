import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import InquiryForm from './InquiryForm';
import { SITE, socialLinks } from '../data/site';
import { useOverlay } from '../hooks/useOverlay';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function InquiryModal({ isOpen, onClose, defaultService = '' }: InquiryModalProps) {
  useOverlay(isOpen, onClose);
  const contactSocials = socialLinks.filter((s) => s.key !== 'whatsapp');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="inquiry-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-navy-deep/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Left Pane: Contact Info & Socials (Premium Dark) */}
            <div className="bg-navy-deep text-white md:w-2/5 relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute -top-[20%] -right-[20%] w-[70%] h-[70%] rounded-full bg-gold blur-[120px]" />
                <div className="absolute -bottom-[20%] -left-[20%] w-[70%] h-[70%] rounded-full bg-gold blur-[120px] opacity-50" />
              </div>

              <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between overflow-y-auto custom-scrollbar">
                <div className="mb-12">
                  <h2 className="font-serif text-3xl md:text-4xl mb-4 leading-tight">
                    Let's shape the <em className="italic text-gold not-italic">future</em> together.
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-10">
                    Whether you're looking to rebrand, launch a new campaign, or scale your digital presence, our team of experts is ready to turn your vision into reality. Reach out to us directly or fill out the form.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-gold group-hover:bg-gold/10 transition-all">
                        <Mail size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-widest text-white/40 font-bold mb-1">Email Us</p>
                        <a href={`mailto:${SITE.email}`} className="text-sm hover:text-gold transition-colors">{SITE.email}</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-gold group-hover:bg-gold/10 transition-all">
                        <Phone size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-widest text-white/40 font-bold mb-1">Call Us</p>
                        <a href={`tel:${SITE.phoneRaw}`} className="text-sm hover:text-gold transition-colors">{SITE.phoneDisplay}</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-wa-green group-hover:bg-wa-green/10 transition-all">
                        <WhatsAppIcon size={18} className="text-wa-green" />
                      </div>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-widest text-white/40 font-bold mb-1">WhatsApp</p>
                        <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-wa-green transition-colors">Chat with us instantly</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <p className="text-[0.65rem] uppercase tracking-widest text-white/40 font-bold mb-4">Connect With Us</p>
                  <div className="flex gap-3">
                    {contactSocials.map((social) => (
                      <a key={social.key} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-gold hover:text-navy-deep hover:border-gold transition-all" aria-label={social.label}>
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Pane: Form */}
            <div className="md:w-3/5 bg-white relative flex flex-col max-h-[90vh] md:max-h-none overflow-hidden">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-slate-400 hover:text-navy-deep transition-colors z-10 bg-white/80 backdrop-blur-sm rounded-full"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="flex-grow overflow-y-auto p-8 md:p-12 custom-scrollbar">
                <InquiryForm defaultService={defaultService} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
