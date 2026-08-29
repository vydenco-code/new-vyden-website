import type { ReactNode } from 'react';
import { Link } from '../router';
import { socialLinks } from './site';

interface LegalSection {
  title: string;
  body: ReactNode;
}

function LegalText({ children }: { children: ReactNode }) {
  return <div className="space-y-6 text-sm text-slate-600 leading-relaxed">{children}</div>;
}

function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h4 className="font-semibold text-navy-deep mb-2">{heading}</h4>
      {children}
    </section>
  );
}

const LAST_UPDATED = <p className="text-xs text-slate-400">Last Updated: March 29, 2026</p>;

export function getLegalContent(onClose: () => void): Record<string, LegalSection> {
  const social = (key: string) => socialLinks.find((s) => s.key === key);

  return {
    'Privacy Policy': {
      title: 'Privacy Policy',
      body: (
        <LegalText>
          {LAST_UPDATED}
          <p>
            At Vyden Co., we are committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, and safeguard your information when you visit our website or use
            our services.
          </p>

          <Section heading="1. Information We Collect">
            <p>
              We may collect personal information such as your name, email address, and phone number
              when you voluntarily provide it to us through contact forms or service inquiries. We
              also collect non-personal information such as browser type, IP address, and pages
              visited to improve our website experience.
            </p>
          </Section>

          <Section heading="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Respond to your inquiries and provide requested services.</li>
              <li>Improve our website and service offerings.</li>
              <li>Communicate with you about project updates and marketing news (with your consent).</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </Section>

          <Section heading="3. Data Security">
            <p>
              We implement a variety of security measures to maintain the safety of your personal
              information. However, no method of transmission over the internet is 100% secure, and
              we cannot guarantee absolute security.
            </p>
          </Section>

          <Section heading="4. Third-Party Disclosure">
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information
              to outside parties without your consent, except for trusted third parties who assist
              us in operating our website and conducting our business.
            </p>
          </Section>
        </LegalText>
      ),
    },
    'Terms of Service': {
      title: 'Terms of Service',
      body: (
        <LegalText>
          {LAST_UPDATED}
          <p>
            By accessing or using the services provided by Vyden Co., you agree to be bound by these
            Terms of Service.
          </p>

          <Section heading="1. Service Agreement">
            <p>
              Vyden Co. provides digital marketing, branding, and creative services. The specific
              scope of work, timelines, and deliverables for each project will be outlined in a
              separate signed agreement or proposal.
            </p>
          </Section>

          <Section heading="2. Intellectual Property">
            <p>
              Unless otherwise agreed in writing, all creative materials produced by Vyden Co.
              remain our intellectual property until full payment for the project has been received.
              Upon final payment, the client is granted the rights specified in the project
              agreement.
            </p>
          </Section>

          <Section heading="3. Payment Terms">
            <p>
              Payment schedules are defined per project. Late payments may result in project delays
              or suspension of services.
            </p>
          </Section>

          <Section heading="4. Limitation of Liability">
            <p>
              Vyden Co. shall not be liable for any indirect, incidental, or consequential damages
              arising out of the use of our services or any third-party platforms used during the
              project.
            </p>
          </Section>
        </LegalText>
      ),
    },
    'Cookie Policy': {
      title: 'Cookie Policy',
      body: (
        <LegalText>
          {LAST_UPDATED}
          <p>Vyden Co. uses cookies to enhance your experience on our website.</p>

          <Section heading="1. What are Cookies?">
            <p>
              Cookies are small text files that are stored on your device when you visit a website.
              They help the website recognize your device and remember your preferences, such as
              login information or language settings.
            </p>
          </Section>

          <Section heading="2. Types of Cookies We Use">
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Essential Cookies:</strong> Necessary for the website to function correctly.</li>
              <li>
                <strong>Analytical Cookies:</strong> Help us understand how visitors interact with our
                website by collecting and reporting information anonymously.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Used to track visitors across websites to display
                relevant and engaging ads.
              </li>
            </ul>
          </Section>

          <Section heading="3. Managing Cookies">
            <p>
              You can choose to disable cookies through your individual browser settings. However,
              please note that some parts of our website may not function properly if you do so.
            </p>
          </Section>
        </LegalText>
      ),
    },
    Disclaimer: {
      title: 'Disclaimer',
      body: (
        <LegalText>
          {LAST_UPDATED}
          <p>The information provided on the Vyden Co. website is for general informational purposes only.</p>

          <Section heading="1. No Guarantees">
            <p>
              While we strive to provide the best possible results for our clients, Vyden Co. makes
              no guarantees regarding the specific outcomes of marketing campaigns, SEO rankings, or
              lead generation efforts, as results can vary based on numerous external factors beyond
              our control.
            </p>
          </Section>

          <Section heading="2. External Links">
            <p>
              Our website may contain links to external sites that are not operated by us. We have
              no control over the content and practices of these sites and cannot accept
              responsibility or liability for their respective privacy policies.
            </p>
          </Section>

          <Section heading="3. Professional Advice">
            <p>
              The content on this site does not constitute professional financial, legal, or
              business advice. You should consult with a professional before making any significant
              business decisions based on the content of this website.
            </p>
          </Section>
        </LegalText>
      ),
    },
    Sitemap: {
      title: 'Sitemap',
      body: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <ul className="grid grid-cols-2 gap-4">
            <li>
              <h4 className="font-semibold text-navy-deep mb-2">Main Sections</h4>
              <ul className="space-y-1">
                <li><Link to="/" onClick={onClose} className="hover:text-gold transition-colors">Home</Link></li>
                <li><Link to="/about" onClick={onClose} className="hover:text-gold transition-colors">About Us</Link></li>
                <li><Link to="/services" onClick={onClose} className="hover:text-gold transition-colors">Services</Link></li>
                <li><Link to="/software" onClick={onClose} className="hover:text-gold transition-colors">Custom Software</Link></li>
                <li><Link to="/work" onClick={onClose} className="hover:text-gold transition-colors">Our Work</Link></li>
              </ul>
            </li>
            <li>
              <h4 className="font-semibold text-navy-deep mb-2">Connect</h4>
              <ul className="space-y-1">
                {(['whatsapp', 'instagram', 'linkedin'] as const).map((key) => {
                  const link = social(key);
                  return link ? (
                    <li key={key}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ) : null;
                })}
              </ul>
            </li>
          </ul>
        </div>
      ),
    },
  };
}
