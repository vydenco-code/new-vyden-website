import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { getLegalContent } from '../data/legal';
import { useOverlay } from '../hooks/useOverlay';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  useOverlay(isOpen, onClose);

  const content = getLegalContent(onClose);
  const activeContent = content[type] || { title: 'Legal Information', body: <p>Content not found.</p> };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="legal-modal-container" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-6 flex items-center justify-between bg-off-white">
              <h3 className="font-serif text-xl font-semibold text-navy-deep tracking-wide">{activeContent.title}</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-navy-deep"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto custom-scrollbar">
              {activeContent.body}
            </div>
            <div className="p-6 bg-off-white flex justify-end">
              <button
                onClick={onClose}
                className="bg-navy-deep text-white px-6 py-2 rounded-sm text-xs font-semibold uppercase tracking-widest hover:bg-navy-mid transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
