import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import { Link } from '../router';
import { useInquiry } from '../inquiry';
import { SITE, socialLinks } from '../data/site';

interface FooterProps {
  onOpenLegal: (type: string) => void;
}

export default function Footer({ onOpenLegal }: FooterProps) {
  const openInquiry = useInquiry();
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: 'Privacy Policy' },
    { name: 'Terms of Service' },
    { name: 'Cookie Policy' },
    { name: 'Disclaimer' },
    { name: 'Sitemap' },
  ];

  const seoKeywords = [
    'digital marketing agency in Kolkata',
    'best Kolkata digital marketing agencies',
    'podcast creation in Kolkata',
    'graphic designing in Kolkata',
    'WhatsApp automation in Kolkata',
    'social media marketing in Kolkata',
    'meta ads marketing in Kolkata',
    'Google ads marketing in Kolkata'
  ];

  return (
    <footer className="bg-[#070f1a] pt-20 pb-20 px-[5%] border-t border-gold/15">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14 mb-16">
        <div className="footer-brand">
          <span className="font-serif text-2xl font-bold text-white tracking-wider block mb-5">Vyden Co.</span>
          <p className="text-[0.83rem] text-white/40 leading-relaxed font-light mb-7 max-w-md">
            Vyden Co. is a leading <strong className="text-gold font-normal">digital marketing agency in Kolkata</strong>, serving ambitious brands globally. We build brands, drive performance, and shape digital futures using AI-powered strategies and data-driven execution.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a 
                key={social.label}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center text-white/50 transition-all hover:border-gold hover:text-gold hover:bg-gold/5"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4 className="font-serif text-base font-semibold text-white mb-5 tracking-wide">Services</h4>
          <ul className="space-y-2.5">
            {[
              'Social Media Marketing', 'Google Business & SEO', 'Branding & PR', 
              'Podcast Production', 'WhatsApp Automation', 'Web & App Development', 
              'Influencer Marketing', 'Graphic Design', 'Outdoor Advertising'
            ].map((item) => (
              <li key={item}>
                <Link to="/services" className="text-[0.8rem] text-white/40 hover:text-gold transition-colors font-light">{item}</Link>
              </li>
            ))}
            <li>
              <Link to="/software" className="text-[0.8rem] text-gold/80 hover:text-gold transition-colors font-light">Custom Internal Software</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="font-serif text-base font-semibold text-white mb-5 tracking-wide">Company</h4>
          <ul className="space-y-2.5">
            {[
              { name: 'About Us', href: '/about' },
              { name: 'Our Vision', href: '/about#vision' },
              { name: 'Custom Software', href: '/software' },
              { name: 'Our Work', href: '/work' },
              { name: 'Contact Us', href: '/contact' },
            ].map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="text-[0.8rem] text-white/40 hover:text-gold transition-colors font-light">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="font-serif text-base font-semibold text-white mb-5 tracking-wide">Get in Touch</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-gold mt-1 flex-shrink-0" />
              <span className="text-[0.8rem] text-white/40 font-light">{SITE.phoneDisplay}</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-gold mt-1 flex-shrink-0" />
              <span className="text-[0.8rem] text-white/40 font-light">{SITE.email}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
              <span className="text-[0.8rem] text-white/40 font-light">{SITE.location}</span>
            </div>
            <div className="flex items-start gap-3">
              <Globe size={16} className="text-gold mt-1 flex-shrink-0" />
              <span className="text-[0.8rem] text-white/40 font-light">{SITE.scope}</span>
            </div>
          </div>
          <button 
            onClick={() => openInquiry()}
            className="mt-7 inline-flex items-center gap-2 bg-gold text-navy-deep px-5 py-3 rounded-sm text-[0.72rem] font-semibold uppercase tracking-widest hover:bg-gold-light transition-colors cursor-pointer"
          >
            <Phone size={14} />
            Schedule a Callback
          </button>
        </div>
      </div>

      <hr className="border-white/5 mb-10 max-w-7xl mx-auto" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-center md:text-left">
        <div className="order-3 md:order-1 flex items-center h-full">
          <p className="text-[0.75rem] text-white/25 font-light leading-none">© {currentYear} Vyden Co. All rights reserved. · India</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 order-1 md:order-2 h-full">
          {legalLinks.map((item) => (
            <button 
              key={item.name} 
              onClick={() => onOpenLegal(item.name)} 
              className="text-[0.72rem] text-white/25 hover:text-gold transition-colors cursor-pointer leading-none"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="order-2 md:order-3 flex items-center justify-center md:justify-end h-full">
          <span className="text-[0.68rem] text-white/20 tracking-widest flex items-center gap-1.5 uppercase leading-none">
            <span className="text-gold inline-flex items-center justify-center">✦</span> Built with Vision by Vyden Co.
          </span>
        </div>
      </div>
      
      {/* Seamless SEO Keywords */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 opacity-20 hover:opacity-40 transition-opacity duration-500">
          {seoKeywords.map((keyword, idx) => (
            <span key={idx} className="text-[0.6rem] text-white uppercase tracking-widest font-light flex items-center">
              {keyword} {idx < seoKeywords.length - 1 && <span className="ml-4 text-gold/30">|</span>}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
