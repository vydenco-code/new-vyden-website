import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import InquiryForm from '../components/InquiryForm';
import PageHeader from '../components/PageHeader';
import { SITE, socialLinks } from '../data/site';
import { usePageMeta } from '../hooks/usePageMeta';

export default function ContactPage() {
  usePageMeta('Contact Us', 'Call, WhatsApp or email Vyden Co. — a full-service marketing and software agency based in Kolkata, serving clients globally.');

  return (
    <>
      <PageHeader
        label="Contact Us"
        title={<>Let's Talk About<br /><em className="italic text-gold not-italic">Your Growth.</em></>}
        description="Call, message or fill out the form — whichever suits you. We usually respond within 24–48 hours."
      />

      <section className="bg-off-white py-20 px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          {/* Contact Info */}
          <div>
            <div className="space-y-5 mb-10">
              <a href={`tel:${SITE.phoneRaw}`} className="flex items-start gap-4 bg-white border-l-[3px] border-gold p-5 rounded-r-sm shadow-sm hover:-translate-y-0.5 transition-transform group">
                <div className="w-11 h-11 rounded-sm bg-navy-deep/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/15 transition-colors">
                  <Phone size={18} className="text-navy-deep" />
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-widest text-slate-400 font-bold mb-1">Call Us</p>
                  <p className="text-navy-deep text-sm">{SITE.phoneDisplay}</p>
                </div>
              </a>

              <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 bg-white border-l-[3px] border-wa-green p-5 rounded-r-sm shadow-sm hover:-translate-y-0.5 transition-transform group">
                <div className="w-11 h-11 rounded-sm bg-navy-deep/5 flex items-center justify-center flex-shrink-0 group-hover:bg-wa-green/15 transition-colors">
                  <WhatsAppIcon size={18} className="text-navy-deep" />
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-widest text-slate-400 font-bold mb-1">WhatsApp</p>
                  <p className="text-navy-deep text-sm">Chat with us instantly</p>
                </div>
              </a>

              <a href={`mailto:${SITE.email}`} className="flex items-start gap-4 bg-white border-l-[3px] border-gold p-5 rounded-r-sm shadow-sm hover:-translate-y-0.5 transition-transform group">
                <div className="w-11 h-11 rounded-sm bg-navy-deep/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/15 transition-colors">
                  <Mail size={18} className="text-navy-deep" />
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-widest text-slate-400 font-bold mb-1">Email Us</p>
                  <p className="text-navy-deep text-sm">{SITE.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 bg-white border-l-[3px] border-navy-deep/30 p-5 rounded-r-sm shadow-sm">
                <div className="w-11 h-11 rounded-sm bg-navy-deep/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-navy-deep" />
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-widest text-slate-400 font-bold mb-1">Based In</p>
                  <p className="text-navy-deep text-sm flex items-center gap-2"><MapPin size={13} /> {SITE.location}</p>
                  <p className="text-navy-deep/60 text-sm mt-1 flex items-center gap-2"><Globe size={13} /> {SITE.scope}</p>
                </div>
              </div>
            </div>

            <p className="text-[0.65rem] uppercase tracking-widest text-slate-400 font-bold mb-4">Connect With Us</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.key}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-11 h-11 border border-slate-200 rounded-sm flex items-center justify-center text-slate-400 transition-all hover:border-gold hover:text-gold hover:bg-gold/5"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-sm shadow-lg p-8 md:p-12">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
