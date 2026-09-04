import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Story from '../components/Story';
import BrandDNA from '../components/BrandDNA';
import ServiceOrbit from '../components/ServiceOrbit';
import SoftwareTeaser from '../components/SoftwareTeaser';
import GrowthEngine from '../components/GrowthEngine';
import ClientStrip from '../components/ClientStrip';
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
      <BrandDNA />
      <ServiceOrbit />
      <GoldDivider dark />
      <SoftwareTeaser />
      <GrowthEngine />
      <ClientStrip />
      <ServiceFinder />
      <GoldDivider />
      <CTA />
    </>
  );
}
