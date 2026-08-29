import { motion } from 'motion/react';

export default function Story() {
  return (
    <section id="story" className="bg-white py-24 px-[5%] flex justify-center items-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col max-w-4xl w-full"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-6 h-[1px] bg-gold"></div>
          <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">About Us</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-normal text-navy-deep leading-tight tracking-tight mb-5">
          Driven by Passion.<br /><em className="italic text-navy-mid not-italic">Defined by Results.</em>
        </h2>
        <div className="space-y-5 text-[0.98rem] text-slate-600 leading-relaxed font-light">
          <p>
            Vyden Co. was founded on a simple yet powerful idea — to turn a shared dream into a bold reality. What began as a vision among driven individuals has grown into a results-focused digital marketing agency built for the modern world.
          </p>
          <p>
            Rooted in Kolkata and shaped by an ever-evolving digital landscape, we are a team of young, passionate professionals who have lived and breathed digital from the very beginning. We don't just follow trends — we study them, understand them, and use them to create meaningful, measurable impact for every client we serve.
          </p>
          <p>
            Our approach is grounded in a deep understanding of algorithms, consumer behavior, and smart execution. Long before stepping into the industry, we immersed ourselves in the fundamentals of digital marketing — from SEO and content strategy to Meta and Google Ads and web design and development. Every solution we offer comes from real expertise, not guesswork.
          </p>
          <p>
            Vyden Co. is more than an agency. We are a team of individuals with complementary strengths, united by one goal: delivering results that move the needle. We take action, push boundaries, and constantly evolve — because standing still was never part of the plan.
          </p>
          <p>
            At our core, we stand by one belief — if you dare to grow, we dare to deliver.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
