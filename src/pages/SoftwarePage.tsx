import { motion } from 'motion/react';
import { ArrowRight, ClipboardList, Boxes, MessageSquare, CalendarCheck, Table2, Wrench } from 'lucide-react';
import { useInquiry } from '../inquiry';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import { usePageMeta } from '../hooks/usePageMeta';

const tools = [
  {
    icon: <ClipboardList size={26} strokeWidth={1.5} />,
    title: 'Lead-Tracking CRM',
    description: 'Every inquiry — from calls, WhatsApp chats, ads and walk-ins — captured in one place. Follow up on time, assign leads to the right person, and never lose a customer because a message got buried.'
  },
  {
    icon: <Boxes size={26} strokeWidth={1.5} />,
    title: 'Inventory Systems',
    description: 'Live stock visibility across your store or warehouse. Track purchases, sales and low-stock alerts without touching a spreadsheet at the end of the day.'
  },
  {
    icon: <MessageSquare size={26} strokeWidth={1.5} />,
    title: 'WhatsApp Automation Dashboards',
    description: 'See every conversation, broadcast and automated reply in one dashboard. Connect your WhatsApp flows directly to your leads so nothing slips through.'
  },
  {
    icon: <CalendarCheck size={26} strokeWidth={1.5} />,
    title: 'Booking & Appointment Systems',
    description: 'Let customers book slots online while your team sees the full schedule in real time. Reminders, confirmations and calendar sync included.'
  },
  {
    icon: <Table2 size={26} strokeWidth={1.5} />,
    title: 'Custom Sheets & Internal Jobs',
    description: 'Still running the business on ten different spreadsheets? We turn them into one clean system your whole team can actually use — with the fields and reports you choose.'
  },
  {
    icon: <Wrench size={26} strokeWidth={1.5} />,
    title: 'Built Around Your Use Case',
    description: 'No two businesses work the same way, so no two tools we build are alike. Tell us the problem — we design the software around it, not the other way around.'
  }
];

const process = [
  {
    step: '01',
    title: 'We Sit With Your Process',
    description: 'First we understand how your team actually works day to day — where time is wasted and where things slip.'
  },
  {
    step: '02',
    title: 'We Map the Tool',
    description: 'Together we decide exactly what the software should do, who uses it, and what it must replace.'
  },
  {
    step: '03',
    title: 'We Build & Test',
    description: 'We build the tool in stages, testing with real data and real feedback from your team as we go.'
  },
  {
    step: '04',
    title: 'We Train & Support',
    description: 'Your team gets trained, and we stay available for updates, fixes and new features as you grow.'
  }
];

export default function SoftwarePage() {
  const openInquiry = useInquiry();
  usePageMeta('Custom Internal Software', 'We design and build custom internal software for businesses — lead-tracking CRMs, inventory systems, WhatsApp dashboards, booking systems and more.');

  return (
    <>
      <PageHeader
        label="Beyond Marketing"
        pattern
        title={<>Custom Software,<br /><em className="italic text-gold not-italic">Built for Your Business.</em></>}
        description="Most businesses run on a mix of WhatsApp groups, notebooks and scattered spreadsheets. It works — until it doesn't. We build internal tools that fit the way your team already works, so daily jobs take minutes instead of hours."
      />

      {/* Tools Grid */}
      <section className="bg-off-white py-24 px-[5%]">
        <div className="mb-14">
          <SectionHeader
            title={<>What We <em className="italic text-navy-mid not-italic">Build</em></>}
            description="These are the tools we build most often. If your problem doesn't fit a category below, that's exactly what 'custom' means for us."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white border border-slate-100 rounded-sm p-8 transition-all hover:border-gold/60 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(13,30,51,0.06)]"
            >
              <div className="w-12 h-12 border border-gold/40 rounded-sm flex items-center justify-center text-gold mb-5">
                {tool.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy-deep mb-2.5">{tool.title}</h3>
              <p className="text-[0.83rem] text-slate-500 leading-relaxed font-light">{tool.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy-deep py-24 px-[5%]">
        <div className="mb-14">
          <SectionHeader
            dark
            label="How We Work"
            title={<>From Messy Workflow to<br /><em className="italic text-gold not-italic">Working Tool.</em></>}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {process.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white/5 border border-white/10 rounded-sm p-8 hover:border-gold/50 transition-colors"
            >
              <span className="font-serif text-5xl font-bold text-gold/25 block mb-4">{item.step}</span>
              <h3 className="font-serif text-lg font-semibold text-white mb-2.5">{item.title}</h3>
              <p className="text-[0.82rem] text-white/50 leading-relaxed font-light">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-white py-20 px-[5%] text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-normal text-navy-deep leading-tight tracking-tight mb-4">
          Have a Problem No Software Solves?<br /><em className="italic text-navy-mid not-italic">That's Our Favourite Kind.</em>
        </h2>
        <p className="text-base text-slate-500 leading-relaxed max-w-xl mx-auto mb-9 font-light">
          Tell us what's slowing your team down. We'll figure out whether a custom tool makes sense — and if it does, exactly what it should do.
        </p>
        <button 
          onClick={() => openInquiry('Custom Internal Software')}
          className="inline-flex items-center gap-2.5 bg-gold text-navy-deep px-8 py-4 rounded-sm text-[0.8rem] font-semibold uppercase tracking-[0.12em] hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,169,110,0.3)] transition-all cursor-pointer"
        >
          Discuss Your Project <ArrowRight size={17} />
        </button>
      </section>
    </>
  );
}
