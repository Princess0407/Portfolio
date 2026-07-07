'use client';

import { useState } from 'react';
import { SectionWrapper } from '@/components/section-wrapper';
import { Reveal } from '@/components/reveal';

const contactLinks = [
  {
    label: 'Email',
    value: 'your@email.com',
    href: 'mailto:your@email.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    copyable: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/Princess0407',
    href: 'https://github.com/Princess0407',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/priyanka-tiwari-2b0992263',
    href: 'https://linkedin.com/in/priyanka-tiwari-2b0992263',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
  },
  {
    label: 'Twitter / X',
    value: 'x.com/PriyankaBard',
    href: 'https://x.com/PriyankaBard',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    ),
  },
];

export default function ReachOutPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('your@email.com');
      setCopied(true);
      showToast('email copied');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('your@email.com');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      showToast('please fill all fields');
      return;
    }
    showToast('message sent, talk soon');
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <>
      <SectionWrapper label="contact" title="Reach Out">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-[11px] tracking-[0.1em] uppercase mb-2"
                  style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
                >
                  name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                  placeholder="what should I call you?"
                  className="w-full px-4 py-2.5 rounded-lg text-[14px] transition-all duration-200 outline-none"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-serif)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-[11px] tracking-[0.1em] uppercase mb-2"
                  style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
                >
                  email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg text-[14px] transition-all duration-200 outline-none"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-serif)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-[11px] tracking-[0.1em] uppercase mb-2"
                  style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
                >
                  message
                </label>
                <textarea
                  id="contact-message"
                  value={formState.message}
                  onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                  placeholder="what's on your mind?"
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg text-[14px] transition-all duration-200 outline-none resize-y"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-serif)',
                    minHeight: '120px',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 text-[13px] tracking-wide px-5 py-2.5 rounded-lg transition-all duration-200"
                style={{
                  background: 'var(--accent-dim)',
                  color: 'var(--accent)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent-hover)';
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--accent-dim)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                send message
              </button>
            </form>
          </Reveal>

          {/* Contact info */}
          <Reveal delay={0.1}>
            <div>
              <p
                className="text-[15px] leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: '1.85' }}
              >
                Open to collaborations, conversations about hardware, AI, or security,
                and the occasional rant about Bangalore traffic. Response time: within a week.
              </p>

              <div className="space-y-1">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.copyable ? undefined : link.href}
                    target={link.copyable ? undefined : '_blank'}
                    rel={link.copyable ? undefined : 'noopener noreferrer'}
                    onClick={link.copyable ? handleCopyEmail : undefined}
                    className="group flex items-center gap-3 py-3 transition-all duration-200 cursor-pointer"
                    style={{ borderBottom: '1px solid var(--border)', color: 'var(--text)' }}
                    role={link.copyable ? 'button' : undefined}
                  >
                    <span style={{ color: 'var(--text-tertiary)' }}>{link.icon}</span>
                    <span
                      className="text-[14px] transition-colors duration-200 group-hover:text-[var(--accent)]"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {link.value}
                    </span>
                    {link.copyable && (
                      <span
                        className="ml-auto text-[11px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
                      >
                        {copied ? 'copied' : 'click to copy'}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* Toast */}
      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </>
  );
}
