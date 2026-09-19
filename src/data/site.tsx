import type { ReactNode } from 'react';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import XIcon from '../components/icons/XIcon';

export const SITE = {
  name: 'Vyden Co.',
  phoneDisplay: '+91 99037 99675',
  phoneRaw: '+919903799675',
  whatsappNumber: '919903799675',
  whatsappUrl: 'https://wa.me/919903799675',
  whatsappMessageUrl:
    'https://wa.me/919903799675?text=Hi%20Vyden%20Co.%2C%20I%20want%20to%20know%20more!',
  email: 'vyden.co@gmail.com',
  location: 'India · Serving Worldwide',
  scope: 'Marketing + Software, Worldwide',
  instagramUrl: 'https://www.instagram.com/vyden.co/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61583503198232',
  linkedinUrl: 'https://www.linkedin.com/company/vyden-co/',
  xUrl: 'https://x.com/vyden_co',
} as const;

export interface SocialLink {
  key: 'instagram' | 'facebook' | 'linkedin' | 'x' | 'whatsapp';
  label: string;
  href: string;
  icon: ReactNode;
}

export const socialLinks: SocialLink[] = [
  { key: 'instagram', label: 'Instagram', href: SITE.instagramUrl, icon: <Instagram size={18} /> },
  { key: 'facebook', label: 'Facebook', href: SITE.facebookUrl, icon: <Facebook size={18} /> },
  { key: 'linkedin', label: 'LinkedIn', href: SITE.linkedinUrl, icon: <Linkedin size={18} /> },
  { key: 'x', label: 'X', href: SITE.xUrl, icon: <XIcon /> },
  { key: 'whatsapp', label: 'WhatsApp', href: SITE.whatsappUrl, icon: <WhatsAppIcon size={18} /> },
];
