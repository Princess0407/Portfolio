import { ReactNode } from 'react';

interface FrostedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function FrostedCard({ children, className = '', hover = true }: FrostedCardProps) {
  return (
    <div
      className={`rounded-2xl p-5 transition-all duration-300 ${hover ? 'hover:translate-y-[-2px]' : ''} ${className}`}
      style={{
        background: 'var(--frost-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--frost-border)',
        boxShadow: hover ? '0 4px 20px var(--shadow-color)' : 'none',
      }}
    >
      {children}
    </div>
  );
}
