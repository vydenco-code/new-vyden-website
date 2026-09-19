import { motion } from 'motion/react';

const values = [
  {
    icon: '◈',
    title: 'Results Over Promises',
    text: 'Every strategy is measured by what it delivers — impressions, leads, revenue. We report what matters, not what looks good.',
  },
  {
    icon: '◇',
    title: 'One Team, Every Channel',
    text: 'Digital, traditional, and software — all under one roof. No silos, no finger-pointing. One team executing one plan.',
  },
  {
    icon: '△',
    title: 'Built for the Long Game',
    text: 'We build systems that compound — brands that stick, tools that scale, strategies that outlast trends.',
  },
  {
    icon: '○',
    title: 'Transparent by Default',
    text: 'You see the work, the data, and the decisions. No black boxes, no hidden agendas. Just honest partnership.',
  },
];

export default function TeamValues() {
  return (
    <section className="bg-navy-deep py-28 px-[5%] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <div className="w-6 h-[1px] bg-gold"></div>
            <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">How We Work</span>
            <div className="w-6 h-[1px] bg-gold"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-white leading-tight tracking-tight">
            The Principles Behind<br /><em className="italic text-gold not-italic">Every Project.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative border border-white/10 bg-white/[0.03] p-7 rounded-sm hover:border-gold/40 transition-all"
            >
              <span className="text-gold text-2xl block mb-4 opacity-60 group-hover:opacity-100 transition-opacity">{v.icon}</span>
              <h3 className="font-serif text-lg font-semibold text-white mb-2.5 group-hover:text-gold transition-colors">{v.title}</h3>
              <p className="text-[0.82rem] text-white/45 leading-relaxed font-light">{v.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-12"
        >
          {[
            { label: 'Services Under One Roof', value: '13+' },
            { label: 'Industries Served', value: '20+' },
            { label: 'Campaigns Delivered', value: '100+' },
            { label: 'Client Satisfaction', value: '100%' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-normal text-gold mb-1">{s.value}</p>
              <p className="font-mono text-[0.62rem] text-white/40 uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
