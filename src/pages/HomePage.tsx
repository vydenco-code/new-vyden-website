import Hero from '../components/Hero';
import Story from '../components/Story';
import ServicesPreview from '../components/ServicesPreview';
import SoftwareTeaser from '../components/SoftwareTeaser';
import ClientStrip from '../components/ClientStrip';
import CTA from '../components/CTA';
import { usePageMeta } from '../hooks/usePageMeta';

export default function HomePage() {
  usePageMeta(
    'Digital Marketing, Branding & Custom Software Agency in Kolkata',
    'Vyden Co. is a full-service marketing agency in Kolkata — digital & traditional marketing, WhatsApp automation, web development, and custom internal software.'
  );

  return (
    <>
      <Hero />
      <Story />
      <ServicesPreview />
      <SoftwareTeaser />
      <ClientStrip />
      <CTA />
    </>
  );
}
