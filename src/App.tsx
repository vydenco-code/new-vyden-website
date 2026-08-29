/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense } from 'react';
import { RouterProvider, useRouter } from './router';
import { InquiryContext } from './inquiry';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import CustomCursor from './components/CustomCursor';
import LegalModal from './components/LegalModal';
import InquiryModal from './components/InquiryModal';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const SoftwarePage = lazy(() => import('./pages/SoftwarePage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const WorkDetailPage = lazy(() => import('./pages/WorkDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function Routes() {
  const { path } = useRouter();

  const workMatch = path.match(/^\/work\/([\w-]+)$/);

  if (path === '/') return <HomePage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/services') return <ServicesPage />;
  if (path === '/software') return <SoftwarePage />;
  if (path === '/work') return <WorkPage />;
  if (workMatch) return <WorkDetailPage slug={workMatch[1]} />;
  if (path === '/contact') return <ContactPage />;
  return <NotFoundPage />;
}

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" aria-label="Loading" />
    </div>
  );
}

export default function App() {
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: string }>({
    isOpen: false,
    type: '',
  });
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openLegalModal = (type: string) => {
    setLegalModal({ isOpen: true, type });
  };

  const closeLegalModal = () => {
    setLegalModal({ ...legalModal, isOpen: false });
  };

  const openInquiry = (serviceName: string = '') => {
    setSelectedService(serviceName);
    setIsInquiryOpen(true);
  };

  const closeInquiry = () => {
    setIsInquiryOpen(false);
    setSelectedService('');
  };

  return (
    <RouterProvider>
      <InquiryContext.Provider value={openInquiry}>
        <div className="relative">
          <a
            href="#main-content"
            className="fixed top-2 left-2 z-[200] -translate-y-24 bg-gold text-navy-deep px-5 py-3 rounded-sm text-[0.75rem] font-semibold uppercase tracking-widest shadow-lg transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <div className="noise-overlay"></div>
          
          <CustomCursor />
          <Navbar />
          
          <main role="main" id="main-content">
            <Suspense fallback={<PageLoader />}>
              <Routes />
            </Suspense>
          </main>
          
          <Footer onOpenLegal={openLegalModal} />
          
          <WhatsAppFloat />

          <LegalModal 
            isOpen={legalModal.isOpen} 
            onClose={closeLegalModal} 
            type={legalModal.type} 
          />

          <InquiryModal 
            isOpen={isInquiryOpen} 
            onClose={closeInquiry} 
            defaultService={selectedService}
          />
        </div>
      </InquiryContext.Provider>
    </RouterProvider>
  );
}
