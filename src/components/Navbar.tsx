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

      {/* Mobile Menu — full-screen cinematic overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-navy-deep flex flex-col px-[8%] pt-24 pb-10 md:hidden"
          >
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            <button
              className="absolute top-5 right-[5%] p-2 text-white/70 hover:text-gold transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
            <p className="relative font-mono text-[0.62rem] text-gold/70 tracking-[0.3em] mb-8">VYDEN / MENU</p>
            <nav className="relative flex flex-col gap-2" aria-label="Mobile">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-baseline gap-4 py-2 ${isActive(link.href) ? 'text-gold' : 'text-white'}`}
                  >
                    <span className="font-mono text-[0.62rem] text-gold/60 tracking-[0.2em]">0{i + 1}</span>
                    <span className="font-serif text-4xl font-light tracking-tight group-hover:text-gold group-hover:translate-x-2 transition-all">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5 }}
              className="relative mt-auto"
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  openInquiry();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy-deep px-6 py-4 rounded-sm text-[0.8rem] font-semibold uppercase tracking-[0.12em]"
              >
                <MessageSquare size={18} /> Get in Touch
              </button>
              <p className="text-center font-mono text-[0.6rem] text-white/30 tracking-[0.3em] mt-5">VYDEN CO. — VYDEN YOUR HORIZONS</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
