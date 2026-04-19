'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import WaxSeal from '@/components/illustrations/WaxSeal'
import QuillDivider from '@/components/illustrations/QuillDivider'
import InkOrnament from '@/components/illustrations/InkOrnament'

// ─── Konami / Easter egg: type "forsooth" ─────────────────────────────────────
function useForsooth() {
  const [triggered, setTriggered] = useState(false)
  const [buf, setBuf] = useState('')
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setBuf(prev => {
        const next = (prev + e.key).slice(-7)
        if (next === 'forsoot' + 'h') { setTriggered(true); setTimeout(() => setTriggered(false), 4000) }
        return next
      })
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  return triggered
}

export default function HomePage() {
  const forsooth = useForsooth()
  const [visible, setVisible] = useState(false)
  useEffect(() => { setVisible(true) }, [])

  return (
    <>
      {/* ── Easter egg overlay ── */}
      {forsooth && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(26,15,10,0.85)', backdropFilter: 'blur(4px)',
        }}>
          <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
            <WaxSeal letter="F" size={140} />
            <p className="fraktur" style={{ fontSize: '3rem', color: '#f5cba7', marginTop: '1rem' }}>
              Forsooth!
            </p>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: '#c49a6c', fontSize: '1.2rem' }}>
              Thou hast discovered the secret passage.
            </p>
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <section style={{
        minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '4rem 2rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background ornamental large character */}
        <span className="fraktur" style={{
          position: 'absolute', top: '-2rem', right: '-2rem',
          fontSize: '28rem', color: 'var(--border-light)', opacity: 0.18,
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>P</span>

        <div style={{ maxWidth: '780px', textAlign: 'center', position: 'relative' }}>
          {/* Wax seal */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem',
            opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
            <WaxSeal letter="P" size={110} />
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: '"UnifrakturMaguntia", cursive',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            color: 'var(--text)',
            lineHeight: 1.05,
            marginBottom: '0.4rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            {}Priyanka Tiwari 
          </h1>

          {/* Title badge */}
          <p style={{
            fontFamily: '"IM Fell English SC", serif',
            fontSize: '0.85rem',
            letterSpacing: '0.22em',
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.4s',
          }}>
            Artisan of Silicon · Scribe of Code · Seeker of Knowledge
          </p>

          {/* Tagline */}
          <blockquote style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
            fontStyle: 'italic',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.75,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.6s',
          }}>
            "I fashion intelligent engines that run without the cloud's dominion,
            and craft sentinels that expose the deceits lurking in foreign codebases."
          </blockquote>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.8s',
          }}>
            <Link href="/endeavours">
              <button className="wax-btn">View Mine Endeavours</button>
            </Link>
            <Link href="/broadsheet">
              <button className="ink-btn">Read the Broadsheet</button>
            </Link>
          </div>
        </div>
      </section>

      <QuillDivider />

      {/* ── Featured Projects (brief) ── */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '2rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
            Principal Endeavours
          </h2>
          <p style={{ color: 'var(--text-faint)', fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem' }}>
            The two great works that presently consume mine hours
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <ProjectTeaser
            emoji="⚙️"
            title="The Intelligent Engine"
            oldeSubtitle="Hardware Endeavour · Anno MMXXV"
            desc="A custom hardware device fashioned to run AI models locally — without fealty to distant cloud servers. Neural processing units, on-device inference, and the sovereign use of one's own silicon."
            status="In Progress"
            href="/endeavours#engine"
          />
          <ProjectTeaser
            emoji="🕵️"
            title="The Deceiver's Snare"
            oldeSubtitle="Security Endeavour · Anno MMXXV"
            desc="A browser extension that doth unveil false and malicious GitHub repositories before one clones or executes them — combining a sandboxed environment with counterfeit code buried in dependencies."
            status="In Progress"
            href="/endeavours#snare"
          />
        </div>
      </section>

      <QuillDivider />

      {/* ── About snippet ── */}
      <section style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <InkOrnament variant="fleur" size={40} className="mx-auto mb-6" />
        <h2 style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '1.8rem', marginBottom: '1.2rem', color: 'var(--text)' }}>
          Of Mine Own Self
        </h2>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '1rem' }}>
          I am a craftsman who walks the frontier between hardware and software —
          building devices that think, writing code that guards, and setting down
          my thoughts in the Broadsheet for those who chance upon this place.
        </p>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '2rem' }}>
          My instruments of craft span embedded systems, machine learning,
          browser extensions, and the arcane arts of systems programming.
        </p>
        <Link href="/artes"><button className="ink-btn">Survey Mine Artes</button></Link>
      </section>

      <QuillDivider />

      {/* ── CTA: Contact ── */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <p className="fraktur" style={{ fontSize: '2.2rem', color: 'var(--text-faint)', marginBottom: '0.5rem' }}>
          Wouldst thou converse?
        </p>
        <h2 style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '1.6rem', color: 'var(--text)', marginBottom: '1rem' }}>
          Send Thine Missive
        </h2>
        <p style={{ color: 'var(--text-faint)', fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif', marginBottom: '2rem' }}>
          For collaborations, queries, or mere correspondence — thy parchment is welcome.
        </p>
        <Link href="/missive"><button className="wax-btn">Open the Scriptorium</button></Link>
      </section>
    </>
  )
}

// ─── Project teaser card ──────────────────────────────────────────────────────
function ProjectTeaser({
  emoji, title, oldeSubtitle, desc, status, href
}: {
  emoji: string; title: string; oldeSubtitle: string;
  desc: string; status: string; href: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="scroll-card" style={{ height: '100%', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2rem', lineHeight: 1 }}>{emoji}</span>
          <div>
            <h3 style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '1.25rem', color: 'var(--text)', marginBottom: '0.15rem' }}>
              {title}
            </h3>
            <span style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
              {oldeSubtitle}
            </span>
          </div>
        </div>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
          {desc}
        </p>
        <span style={{
          display: 'inline-block',
          fontFamily: '"IM Fell English SC", serif',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          border: '1px solid var(--seal)',
          color: 'var(--seal)',
          padding: '0.2rem 0.7rem',
          textTransform: 'uppercase',
        }}>
          {status}
        </span>
      </div>
    </Link>
  )
}
