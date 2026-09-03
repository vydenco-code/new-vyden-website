import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  useEffect(() => {
    if (paused || total < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 6500);
    return () => clearInterval(id);
  }, [paused, total]);

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  return (
    <section
      className="bg-white py-24 px-[5%]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-4 justify-center">
          <div className="w-6 h-[1px] bg-gold"></div>
          <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">Client Words</span>
          <div className="w-6 h-[1px] bg-gold"></div>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-normal text-navy-deep leading-tight tracking-tight mb-12">
          Brands That <em className="italic text-navy-mid not-italic">Felt The Shift.</em>
        </h2>

        <div className="relative min-h-[300px] sm:min-h-[260px]">
          <span aria-hidden="true" className="font-serif text-[7rem] leading-none text-gold/20 absolute -top-10 left-1/2 -translate-x-1/2 select-none">“</span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <blockquote className="font-serif text-2xl md:text-[2rem] font-normal text-navy-deep leading-snug mb-8">
                {testimonials[index].quote}
              </blockquote>
              <figcaption>
                <p className="text-[0.85rem] font-semibold text-navy-deep tracking-wide">{testimonials[index].name}</p>
                <p className="text-[0.72rem] text-slate-400 uppercase tracking-[0.18em] mt-1 mb-5">{testimonials[index].role}</p>
                <span className="inline-block text-[0.68rem] font-semibold text-navy-deep bg-gold/15 border border-gold/40 uppercase tracking-[0.18em] px-4 py-1.5 rounded-full">
                  ✦ {testimonials[index].metric}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border border-navy-deep/15 flex items-center justify-center text-navy-deep hover:bg-navy-deep hover:text-gold hover:border-navy-deep transition-all cursor-pointer"
          >
            <ArrowLeft size={17} />
          </button>
          <div className="flex items-center gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-[3px] rounded-full transition-all duration-400 cursor-pointer ${i === index ? 'w-10 bg-gold' : 'w-5 bg-navy-deep/15 hover:bg-navy-deep/30'}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border border-navy-deep/15 flex items-center justify-center text-navy-deep hover:bg-navy-deep hover:text-gold hover:border-navy-deep transition-all cursor-pointer"
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
