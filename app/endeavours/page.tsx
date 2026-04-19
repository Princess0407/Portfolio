'use client'

import QuillDivider from '@/components/illustrations/QuillDivider'
import InkOrnament  from '@/components/illustrations/InkOrnament'
import WaxSeal      from '@/components/illustrations/WaxSeal'

const PROJECTS = [
  {
    id:       'engine',
    title:    'The Intelligent Engine',
    subtitle: 'Hardware Endeavour',
    period:   'Anno MMXXV – Present',
    seal:     'E',
    status:   'In Progress',
    summary:  'A custom hardware device fashioned to execute AI models locally — sovereign, private, and unbeholden to any cloud.',
    body: `The premise is thus: the cloud exacts a toll upon its supplicants — in coin, in latency, and in the quiet surrender of one's data to distant servers. This endeavour seeks to dissolve that dependency.

The architecture centres upon a custom system-on-chip featuring dedicated neural processing units, a memory subsystem tuned for transformer workloads, and firmware written to balance efficiency with capability.

The prototype doth presently execute the LLaMA-3.2 model at twelve tokens per second on-device — a promising result, though much refinement remains.`,
    tags:  ['Hardware', 'AI/ML', 'Embedded Systems', 'Systems Programming'],
    links: [{ label: 'Scriptorium (GitHub)', href: '#' }],
  },
  {
    id:       'snare',
    title:    "The Deceiver's Snare",
    subtitle: 'Security Endeavour',
    period:   'Anno MMXXV – Present',
    emoji:    '🕵️',
    seal:     'S',
    status:   'In Progress',
    summary:  'A browser extension that exposes false and malicious GitHub repositories before one clones or executes their treachery.',
    body: `The threat is real: repositories that appear legitimate conceal malevolent dependencies, obfuscated scripts, and counterfeit packages designed to plunder credentials or commandeer machines.

This extension intercepts repository pages and — before clone or execution — subjects the codebase to scrutiny within a sandboxed environment. Counterfeit code is seeded into dependencies to detect exfiltration attempts. Provenance checks, signature verification, and dependency graph analysis complete the sentinel's arsenal.

The vision is to make every developer's journey to a repository as safe as a fortified gatehouse.`,
    tags:  ['Browser Extension', 'Security', 'Sandboxing', 'JavaScript'],
    links: [{ label: 'Scriptorium (GitHub)', href: '#' }],
  },
]

export default function EndeavoursPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <InkOrnament variant="asterism" size={36} className="mx-auto mb-4" />
        <h1 style={{ fontFamily: '"IM Fell English SC", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)', marginBottom: '0.6rem' }}>
          Mine Endeavours
        </h1>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: 'var(--text-faint)', fontSize: '1.15rem', maxWidth: '560px', margin: '0 auto' }}>
          A chronicle of works undertaken — both completed and presently in progress —
          toward the betterment of the digital realm.
        </p>
      </div>

      {/* Projects */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {PROJECTS.map((project, i) => (
          <article key={project.id} id={project.id}>
            {i > 0 && <QuillDivider variant="mini" className="mb-8 mx-auto" />}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>

              {/* Card */}
              <div className="scroll-card">

                {/* Header row */}
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <WaxSeal letter={project.seal} size={72} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                      <h2 style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '1.7rem', color: 'var(--text)', margin: 0 }}>
                        {project.emoji} {project.title}
                      </h2>
                      <StatusBadge status={project.status} />
                    </div>
                    <p style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '0.78rem', color: 'var(--text-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {project.subtitle} · {project.period}
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '1.5rem', borderLeft: '3px solid var(--seal)', paddingLeft: '1.2rem' }}>
                  {project.summary}
                </p>

                {/* Body */}
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', color: 'var(--text)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                  {project.body.split('\n\n').map((para, i) => (
                    <p key={i} style={{ marginBottom: '1rem' }}>{para.trim()}</p>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {project.tags.map(tag => (
                    <span key={tag} className="tag-badge">{tag}</span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {project.links.map(link => (
                    <a key={link.label} href={link.href} className="ink-btn" style={{ display: 'inline-block' }}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <QuillDivider className="mt-16" />

      {/* Other works teaser */}
      <section style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h3 style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '1.3rem', color: 'var(--text)', marginBottom: '0.8rem' }}>
          Other Works & Experiments
        </h3>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: 'var(--text-faint)', marginBottom: '1.5rem' }}>
          Smaller experiments, abandoned journeys, and weekend diversions reside in the Scriptorium.
        </p>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="ink-btn" style={{ display: 'inline-block' }}>
          Visit the Scriptorium
        </a>
      </section>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; color: string; border: string }> = {
    'In Progress': { bg: 'rgba(139,69,19,0.08)', color: 'var(--seal)', border: 'var(--seal)' },
    'Complete':    { bg: 'rgba(34,90,34,0.08)',  color: '#2d6a2d',     border: '#2d6a2d'     },
    'Archived':    { bg: 'rgba(100,100,100,0.08)', color: 'var(--text-faint)', border: 'var(--border)' },
  }
  const s = colors[status] ?? colors['Archived']
  return (
    <span style={{
      fontFamily: '"IM Fell English SC", serif',
      fontSize: '0.7rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '0.2rem 0.7rem',
      border: `1px solid ${s.border}`,
      color: s.color,
      background: s.bg,
    }}>
      {status}
    </span>
  )
}
