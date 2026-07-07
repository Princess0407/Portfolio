import { ReactNode } from 'react';
import { Reveal } from './reveal';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  label?: string;
  title?: string;
  className?: string;
}

export function SectionWrapper({ children, id, label, title, className = '' }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`w-full max-w-2xl mx-auto px-5 md:px-8 py-12 md:py-16 ${className}`}
    >
      {label && (
        <Reveal>
          <p
            className="text-[11px] tracking-[0.18em] uppercase mb-2 flex items-center gap-3"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
          >
            {label}
            <span
              className="flex-1 h-px max-w-[48px]"
              style={{ background: 'var(--accent-dim)' }}
            />
          </p>
        </Reveal>
      )}
      {title && (
        <Reveal delay={0.05}>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-8 leading-tight"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
          >
            {title}
          </h2>
        </Reveal>
      )}
      {children}
    </section>
  );
}
