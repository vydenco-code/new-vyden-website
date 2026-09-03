import Services from '../components/Services';
import CTA from '../components/CTA';
import FAQAccordion from '../components/FAQAccordion';
import { serviceFAQs } from '../data/faqs';
import PageHeader from '../components/PageHeader';
import { usePageMeta } from '../hooks/usePageMeta';

export default function ServicesPage() {
  usePageMeta('Our Services', 'Social media marketing, Google Business & Local SEO, branding, podcast production, WhatsApp automation, web development and more.');

  return (
    <>
      <PageHeader
        label="Our Services"
        title={<>Everything Your Brand Needs.<br /><em className="italic text-gold not-italic">Nothing It Doesn't.</em></>}
        description="Nine core services covering the full digital journey — plus custom internal software for businesses that need tools built around their own way of working."
      />
      <Services />
      <CTA />
      <FAQAccordion faqs={serviceFAQs} title="Quick Answers" />
    </>
  );
}
