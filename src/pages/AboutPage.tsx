import Story from '../components/Story';
import Vision from '../components/Vision';
import HumanAI from '../components/HumanAI';
import CTA from '../components/CTA';
import PageHeader from '../components/PageHeader';
import { usePageMeta } from '../hooks/usePageMeta';

export default function AboutPage() {
  usePageMeta('About Us', 'Learn about Vyden Co. — a team of young, passionate marketers and developers delivering measurable results for brands in Kolkata and globally.');

  return (
    <>
      <PageHeader
        label="About Vyden Co."
        title={<>The People Behind<br /><em className="italic text-gold not-italic">The Results.</em></>}
      />
      <Story />
      <Vision />
      <HumanAI />
      <CTA />
    </>
  );
}
