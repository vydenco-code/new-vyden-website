import Story from '../components/Story';
import AboutProcess from '../components/AboutProcess';
import Vision from '../components/Vision';
import TeamValues from '../components/TeamValues';
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
      <Story staticMode />
      <AboutProcess />
      <Vision />
      <TeamValues />
      <CTA />
    </>
  );
}
