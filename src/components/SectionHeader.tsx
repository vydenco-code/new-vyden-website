import type { ReactNode } from 'react';

interface SectionHeaderProps {
  label?: string;
  title: ReactNode;
  description?: string;
  dark?: boolean;
  center?: boolean;
}

export default function SectionHeader({ label, title, description, dark, center }: SectionHeaderProps) {
  const headingColor = dark ? 'text-white' : 'text-navy-deep';

  return (
    <div className={center ? 'text-center' : ''}>
      {label && (
        <div className={`inline-flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
          <div className="w-6 h-[1px] bg-gold"></div>
          <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">{label}</span>
        </div>
      )}
      <h2 className={`font-serif text-3xl md:text-5xl font-normal ${headingColor} leading-tight tracking-tight ${description ? 'mb-5' : ''}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base leading-relaxed font-light max-w-2xl ${dark ? 'text-white/50' : 'text-slate-500'} ${center ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
