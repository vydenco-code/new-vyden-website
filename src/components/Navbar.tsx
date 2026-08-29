import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useRouter } from '../router';
import { useInquiry } from '../inquiry';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Custom Software', href: '/software' },
  { name: 'Our Work', href: '/work' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { path } = useRouter();
  const openInquiry = useInquiry();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Accessibility: Escape closes the menu, body scroll locks while open,
  // and the menu resets if the viewport grows to desktop size.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (href: string) => path === href;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-[5%] transition-all duration-400 flex items-center justify-between ${scrolled ? 'h-16 bg-white shadow-sm' : 'h-20 bg-white/80 backdrop-blur-md'}`}>
      <Link to="/" className="flex items-center gap-3" ariaLabel="Vyden Co. Home">
        <img 
          src="/vyden-logo.svg" 
          alt="Vyden Co. Logo" 
          className="h-12 w-auto"
          width="150"
          height="48"
          decoding="async"
        />
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-7 lg:gap-9">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link 
              to={link.href} 
              className={`text-[0.8rem] font-normal uppercase tracking-[0.12em] relative group transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 ${isActive(link.href) ? 'text-gold' : 'text-navy'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          </li>
        ))}
        <li>
          <button 
            onClick={() => openInquiry()}
            aria-label="Inquiry Form"
            className="bg-gold text-navy-deep px-6 py-2.5 rounded-sm text-[0.8rem] font-semibold uppercase tracking-[0.12em] hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,169,110,0.3)] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Get in Touch
          </button>
        </li>
      </ul>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden p-2 text-navy"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-navy-deep p-6 flex flex-col gap-5 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                onClick={() => setIsOpen(false)}
                className={`text-[0.85rem] uppercase tracking-widest py-2 transition-colors ${isActive(link.href) ? 'text-gold' : 'text-white/80 hover:text-gold'}`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => {
                setIsOpen(false);
                openInquiry();
              }}
              className="text-gold text-[0.85rem] uppercase tracking-widest py-2 flex items-center gap-2 text-left w-full"
            >
              <MessageSquare size={18} /> Get in Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
