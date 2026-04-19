'use client'

import QuillDivider from '@/components/illustrations/QuillDivider'
import InkOrnament  from '@/components/illustrations/InkOrnament'

const SKILL_GROUPS = [
  {
    title:    'Languages of Tongue',
    subtitle: 'The dialects wherein I speaketh to machines',
    icon:     '📜',
    skills: [
      { name: 'Python',      level: 5, note: 'Mine mother tongue ML, systems, scripting' },
      { name: 'C / C++',     level: 5, note: 'For matters of iron and silicon' },
      { name: 'TypeScript',  level: 4, note: 'The disciplined web dialect' },
      { name: 'Rust',        level: 3, note: 'A language of stern virtue; still learning its ways' },
      { name: 'Assembly',    level: 3, note: 'When one must speak directly to the metal' },
      { name: 'Go',          level: 3, note: 'Concise and swift as a courier' },
    ],
  },
  {
    title:    'Tools of the Trade',
    subtitle: 'Instruments wielded in the course of craft',
    skills: [
      { name: 'Linux / Embedded',  level: 5, note: 'Where most of mine work doth live' },
      { name: 'PyTorch / JAX',     level: 4, note: 'For the fashioning of neural minds' },
      { name: 'Next.js / React',   level: 4, note: 'The web frameworks of choice' },
      { name: 'Docker / Podman',   level: 4, note: 'Containment of one\'s environments' },
      { name: 'LLVM / Compilers',  level: 3, note: 'The translators between worlds' },
      { name: 'Browser Extensions',level: 4, note: 'For The Deceiver\'s Snare and beyond' },
    ],
  },
  {
    title:    'Domains of Study',
    subtitle: 'Fields of learning pursued with earnestness',
    skills: [
      { name: 'Machine Learning',   level: 5, note: 'Inference, training, architecture design' },
      { name: 'Hardware Design',    level: 4, note: 'SoC architecture, PCB, firmware' },
      { name: 'Security Research',  level: 4, note: 'Static analysis, sandboxing, threat modelling' },
      { name: 'Systems Programming',level: 5, note: 'Memory, concurrency, performance' },
      { name: 'Computer Networks',  level: 3, note: 'Protocols, packets, and their mysteries' },
      { name: 'Compilers & PL',     level: 3, note: 'The theory of languages and their translation' },
    ],
  },
]

const ILLUMINATED_BADGES = [
  { symbol: '∑', label: 'Mathematics' },
  { symbol: '∂', label: 'Calculus' },
  { symbol: '⊕', label: 'Logic' },
  { symbol: '◈', label: 'Algorithms' },
  { symbol: '⌥', label: 'Optimisation' },
  { symbol: '∞', label: 'Recursion' },
  { symbol: '◉', label: 'Concurrency' },
  { symbol: '✦', label: 'Architecture' },
]

export default function ArtesPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <InkOrnament variant="fleur" size={44} className="mx-auto mb-4" />
        <h1 style={{
          fontFamily: '"IM Fell English SC", serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: 'var(--text)',
          marginBottom: '0.6rem',
        }}>
          Artes &amp; Crafts
        </h1>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          color: 'var(--text-faint)',
          fontSize: '1.15rem',
          maxWidth: '520px',
          margin: '0 auto',
        }}>
          A faithful accounting of the skills, instruments, and domains of knowledge
          accumulated through years of diligent study and practice.
        </p>
      </div>

      {/* Illuminated badges row */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '1rem',
        justifyContent: 'center', marginBottom: '4rem',
      }}>
        {ILLUMINATED_BADGES.map(b => (
          <div key={b.label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            padding: '0.9rem 1.2rem',
            minWidth: '80px',
            position: 'relative',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px var(--shadow)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.transform = ''
            ;(e.currentTarget as HTMLElement).style.boxShadow = ''
          }}>
            {/* Corner ornaments */}
            <span style={{ position: 'absolute', top: 3, left: 5, color: 'var(--border)', fontSize: '0.6rem' }}>✦</span>
            <span style={{ position: 'absolute', top: 3, right: 5, color: 'var(--border)', fontSize: '0.6rem' }}>✦</span>
            <span style={{
              fontFamily: '"IM Fell English SC", serif',
              fontSize: '1.8rem',
              color: 'var(--seal)',
              lineHeight: 1,
            }}>{b.symbol}</span>
            <span style={{
              fontFamily: '"IM Fell English SC", serif',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: 'var(--text-faint)',
              textTransform: 'uppercase',
            }}>{b.label}</span>
          </div>
        ))}
      </div>

      {/* Skill groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        {SKILL_GROUPS.map((group, gi) => (
          <section key={group.title}>
            {gi > 0 && <QuillDivider variant="mini" className="mb-8 mx-auto" />}

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{group.icon}</span>
              <h2 style={{
                fontFamily: '"IM Fell English SC", serif',
                fontSize: '1.6rem',
                color: 'var(--text)',
              }}>
                {group.title}
              </h2>
            </div>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              color: 'var(--text-faint)',
              fontSize: '1rem',
              marginBottom: '1.8rem',
              marginLeft: '2.3rem',
            }}>
              {group.subtitle}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.2rem',
            }}>
              {group.skills.map(skill => (
                <SkillCard key={skill.name} {...skill} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <QuillDivider className="mt-16" />

      {/* Currently learning */}
      <section style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h3 style={{
          fontFamily: '"IM Fell English SC", serif',
          fontSize: '1.3rem',
          color: 'var(--text)',
          marginBottom: '0.8rem',
        }}>
          Presently Under Study
        </h3>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          color: 'var(--text-faint)',
          fontSize: '1.05rem',
          marginBottom: '1.5rem',
        }}>
          "A craftsman who ceaseth to learn hath already begun to decay."
        </p>
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['RISC-V Architecture', 'Formal Verification', 'Zig Language', 'Hardware Security Modules'].map(t => (
            <span key={t} className="tag-badge" style={{ padding: '0.3rem 0.9rem', fontSize: '0.8rem' }}>
             {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

// ─── Skill card with ink-fill progress bar ────────────────────────────────────
function SkillCard({ name, level, note }: { name: string; level: number; note: string }) {
  return (
    <div className="parchment-card" style={{ padding: '1.1rem 1.3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{
          fontFamily: '"IM Fell English SC", serif',
          fontSize: '1rem',
          color: 'var(--text)',
        }}>
          {name}
        </span>
        {/* Quill dots rating */}
        <div style={{ display: 'flex', gap: '3px' }}>
          {[1,2,3,4,5].map(n => (
            <svg key={n} width="10" height="14" viewBox="0 0 10 14" xmlns="http://www.w3.org/2000/svg">
              <line x1="5" y1="14" x2="5" y2="2"
                stroke={n <= level ? 'var(--seal)' : 'var(--border-light)'}
                strokeWidth="1.2"/>
              {[3,6,9].map((y,i) => (
                <line key={i} x1="5" y1={y} x2={5-(3-i)} y2={y+2}
                  stroke={n <= level ? 'var(--seal)' : 'var(--border-light)'}
                  strokeWidth="0.7" strokeLinecap="round"/>
              ))}
              {[3,6,9].map((y,i) => (
                <line key={i+'r'} x1="5" y1={y} x2={5+(3-i)} y2={y+2}
                  stroke={n <= level ? 'var(--seal)' : 'var(--border-light)'}
                  strokeWidth="0.7" strokeLinecap="round"/>
              ))}
            </svg>
          ))}
        </div>
      </div>

      {/* Ink-fill progress bar */}
      <div style={{
        height: '3px',
        background: 'var(--border-light)',
        borderRadius: '2px',
        marginBottom: '0.6rem',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${(level / 5) * 100}%`,
          background: 'linear-gradient(to right, var(--seal), var(--wax))',
          borderRadius: '2px',
          transition: 'width 1s ease',
        }} />
      </div>

      <p style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontStyle: 'italic',
        fontSize: '0.9rem',
        color: 'var(--text-faint)',
        margin: 0,
      }}>
        {note}
      </p>
    </div>
  )
}
