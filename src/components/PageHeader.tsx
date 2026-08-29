import type { ReactNode } from 'react';

interface PageHeaderProps {
  label: string;
  title: ReactNode;
  description?: string;
  pattern?: boolean;
  children?: ReactNode;
}

export default function PageHeader({ label, title, description, pattern, children }: PageHeaderProps) {
  return (
    <div className="bg-navy-deep pt-36 pb-20 px-[5%] relative overflow-hidden">
      {pattern && (
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(201,169,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      )}
      <div className={`relative z-10 ${pattern ? 'max-w-3xl' : ''}`}>
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-6 h-[1px] bg-gold"></div>
          <span className="text-[0.7rem] font-medium text-gold uppercase tracking-[0.25em]">{label}</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-light text-white leading-tight tracking-tight mb-5">
          {title}
        </h1>
        {description && (
          <p className={`text-base md:text-lg leading-relaxed font-light ${pattern ? 'text-white/65' : 'text-white/50 max-w-2xl'}`}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
