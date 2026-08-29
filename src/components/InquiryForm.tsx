import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

interface InquiryFormProps {
  defaultService?: string;
}

const services = [
  "Social Media Marketing",
  "Google Business & Local SEO",
  "Branding & Public Relations",
  "Podcast Production",
  "WhatsApp Automation & AI",
  "Web & App Development",
  "Custom Internal Software",
  "Influencer Marketing",
  "Graphic Design & Creative",
  "Outdoor Advertising",
  "Other"
];

export default function InquiryForm({ defaultService = '' }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    companyName: '',
    service: '',
    requirements: '',
    // Honeypot — bots fill this, humans never see it
    website: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // When opened with a service pre-selected, fill it in
  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          fullName: '',
          contactNumber: '',
          email: '',
          companyName: '',
          service: '',
          requirements: '',
          website: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="text-gold" size={56} />
        </motion.div>
        <h3 className="font-serif text-3xl text-navy-deep mb-4">Inquiry Received!</h3>
        <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
          Thank you for reaching out. Our team will review your requirements and get back to you within 24-48 hours to discuss the next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-8 pr-8">
        <h3 className="font-serif text-2xl md:text-3xl text-navy-deep mb-2">Project Details</h3>
        <p className="text-slate-500 text-sm">Please provide your information below to get started.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-[0.7rem] font-bold text-navy-deep uppercase tracking-widest">Full Name *</label>
          <input
            required
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Philip Kotler"
            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contactNumber" className="text-[0.7rem] font-bold text-navy-deep uppercase tracking-widest">Contact Number *</label>
          <input
            required
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-[0.7rem] font-bold text-navy-deep uppercase tracking-widest">Email Address *</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="kotler@example.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="companyName" className="text-[0.7rem] font-bold text-navy-deep uppercase tracking-widest">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your Brand Name"
            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="service" className="text-[0.7rem] font-bold text-navy-deep uppercase tracking-widest">Service Interested In *</label>
        <div className="relative">
          <select
            required
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all appearance-none pr-10"
          >
            <option value="" disabled>Select a service</option>
            {services.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="requirements" className="text-[0.7rem] font-bold text-navy-deep uppercase tracking-widest">Project Requirements / Doubts</label>
        <textarea
          id="requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us more about your vision, goals, and timeline..."
          className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all resize-none"
        />
      </div>

      {/* Honeypot — hidden from humans, visible to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full inline-flex items-center justify-center gap-3 bg-gold text-navy-deep px-10 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(201,169,110,0.39)] hover:shadow-[0_6px_20px_rgba(201,169,110,0.23)] hover:-translate-y-0.5"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Sending...
            </>
          ) : (
            <>
              Submit Inquiry <Send size={16} />
            </>
          )}
        </button>
      </div>
      
      {status === 'error' && (
        <p className="text-red-500 text-xs text-center mt-4 bg-red-50 p-3 rounded-sm border border-red-100">Something went wrong. Please try again or contact us directly via email or WhatsApp.</p>
      )}
    </form>
  );
}
