'use client';

import { Reveal } from './reveal';

export function HeroIntro() {
  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 pt-16 pb-6 md:pt-24 md:pb-10">
      <Reveal>
        <p
          className="text-sm tracking-wide mb-3"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        >
          hello, world
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h1
          className="text-5xl md:text-7xl font-bold leading-[1.05] mb-1"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
        >
          Priyanka{' '}
          <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Tiwari.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.14}>
        <p
          className="text-base md:text-lg mt-3 mb-4"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        >
          Low Level Systems Designer
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <p
          className="text-[15px] leading-relaxed mb-2"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)', maxWidth: '540px', lineHeight: '1.85' }}
        >
          I build hardware that runs AI without cloud dependency, and write browser extensions
          that catch malicious repositories before they bite you. Currently deep in two things
          that actually matter.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <p
          className="text-[13px] tracking-wide mb-6"
          style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
        >
          Bangalore, India
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="flex items-center gap-3 flex-wrap">
          <SocialLink href="https://github.com/Princess0407" label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </SocialLink>
          <SocialLink href="https://linkedin.com/in/priyanka-tiwari-2b0992263" label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </SocialLink>
          <SocialLink href="https://x.com/PriyankaBard" label="Twitter / X">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </SocialLink>

          <span className="w-px h-4 mx-1" style={{ background: 'var(--border)' }} />

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13px] tracking-wide px-4 py-1.5 rounded-lg transition-all duration-200"
            style={{
              color: 'var(--accent)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-dim)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            resume
          </a>
        </div>
      </Reveal>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
      style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--accent)';
        e.currentTarget.style.background = 'var(--accent-dim)';
        e.currentTarget.style.borderColor = 'var(--border-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--text-secondary)';
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {children}
    </a>
  );
}
