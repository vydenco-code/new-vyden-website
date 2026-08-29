import WhatsAppIcon from './icons/WhatsAppIcon';
import { motion } from 'motion/react';
import { SITE } from '../data/site';

export default function WhatsAppFloat() {
  return (
    <motion.a 
      href={SITE.whatsappMessageUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-7 right-7 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] z-[900] transition-all group"
      aria-label="Chat on WhatsApp"
      whileHover={{ 
        scale: 1.15,
        boxShadow: "0 0 25px rgba(37, 211, 102, 0.8)",
        rotate: [0, -5, 5, -5, 0]
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1.5
      }}
    >
      <motion.div 
        className="absolute inset-[-4px] rounded-full bg-[#25D366]/20"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.8, 0, 0.8]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <WhatsAppIcon size={32} />
    </motion.a>
  );
}
