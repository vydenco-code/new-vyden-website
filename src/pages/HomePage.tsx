import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Story from '../components/Story';
import CapabilitiesIndex from '../components/CapabilitiesIndex';
import SoftwareTeaser from '../components/SoftwareTeaser';
import ClientStrip from '../components/ClientStrip';
import Testimonials from '../components/Testimonials';
import GoldDivider from '../components/GoldDivider';
import ServiceFinder from '../components/ServiceFinder';
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
      <Stats />
      <Story />
      <CapabilitiesIndex />
      <GoldDivider dark />
      <SoftwareTeaser />
      <ClientStrip />
      <Testimonials />
      <ServiceFinder />
      <GoldDivider />
      <CTA />
    </>
  );
}
