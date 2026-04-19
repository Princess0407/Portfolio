'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import QuillDivider from '@/components/illustrations/QuillDivider'
import WaxSeal      from '@/components/illustrations/WaxSeal'
import InkOrnament  from '@/components/illustrations/InkOrnament'

/*
  Add this table to Supabase to enable the contact form:

  create table missives (
    id          uuid primary key default gen_random_uuid(),
    name        text not null,
    email       text not null,
    subject     text,
    message     text not null,
    created_at  timestamptz default now()
  );
  alter table missives enable row level security;
  create policy "Anyone may send a missive" on missives for insert with check (true);
*/

type Status = 'idle' | 'sending' | 'sent' | 'error'

const SOCIAL_LINKS = [
  { label: 'The Scriptorium',  sublabel: 'GitHub',   href: 'https://github.com/Princess0407',    icon: '⚙' },
  { label: 'The Guild Hall',   sublabel: 'LinkedIn', href: 'https://www.linkedin.com/in/priyanka-tiwari-2b0992263/',  icon: '⚜' },
  { label: 'The Public Square',sublabel: 'Twitter',  href: 'https://x.com/PriyankaBard',   icon: '✦' },
]

export default function MissivePage() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState<Status>('idle')

  async function handleSend() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    setStatus('sending')
    try {
      const { error } = await supabase
        .from('missives')
        .insert({ name, email, subject, message })
      if (error) throw error
      setStatus('sent')
      setName(''); setEmail(''); setSubject(''); setMessage('')
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
    }
  }

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '4rem 2rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <InkOrnament variant="manicule" size={36} className="mx-auto mb-3" />
        <h1 style={{
          fontFamily: '"IM Fell English SC", serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: 'var(--text)',
          marginBottom: '0.6rem',
        }}>
          Send Thine Missive
        </h1>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          color: 'var(--text-faint)',
          fontSize: '1.1rem',
          maxWidth: '480px',
          margin: '0 auto',
        }}>
          For collaboration, inquiry, or mere correspondence —
          thy words are welcome in this scriptorium.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>

        {/* ── Letter / Form ── */}
        {status === 'sent' ? (
          <SentConfirmation />
        ) : (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            padding: '3rem 2.5rem',
            position: 'relative',
            boxShadow: '4px 4px 0 var(--shadow)',
          }}>

            {/* Envelope top fold illusion */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '4px',
              background: 'linear-gradient(to bottom, var(--border), transparent)',
            }}/>

            {/* Letter heading */}
            <div style={{
              textAlign: 'center',
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '1.2rem',
              marginBottom: '2rem',
            }}>
              <p style={{
                fontFamily: '"IM Fell English SC", serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: 'var(--text-faint)',
                textTransform: 'uppercase',
              }}>
                A Personal Communiqué — To Be Delivered with Care
              </p>
            </div>

            {/* Salutation */}
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              color: 'var(--text-muted)',
              marginBottom: '1.8rem',
              fontSize: '1.05rem',
            }}>
              Good morrow! I am most honoured to receive thy correspondence.
              Prithee fill in thy particulars below.
            </p>

            {/* Form fields */}
            <div style={{ display: 'grid', gap: '1.8rem' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>How art thou called?</label>
                  <input className="quill-input" placeholder="Thy full name"
                    value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Thine address of reply?</label>
                  <input className="quill-input" placeholder="name@domain.com" type="email"
                    value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>The Subject of thy Missive</label>
                <input className="quill-input" placeholder="Regarding…"
                  value={subject} onChange={e => setSubject(e.target.value)} />
              </div>

              <div>
                <label style={labelStyle}>Thy Message</label>
                <textarea className="quill-textarea"
                  placeholder="Write thy missive here, with all due candour and courtesy…"
                  style={{ minHeight: '160px' }}
                  value={message} onChange={e => setMessage(e.target.value)} />
              </div>

              {/* Closing */}
              <p style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: 'italic',
                color: 'var(--text-faint)',
                fontSize: '0.95rem',
              }}>
                I remain, in earnest anticipation of thy reply,<br />
                <em>Thy humble correspondent</em>
              </p>

              {/* Error message */}
              {status === 'error' && (
                <div className="toast" style={{ color: 'var(--wax)' }}>
                  Prithee, fill in thy name, address, and message.
                </div>
              )}

              {/* Submit */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  className="wax-btn"
                  onClick={handleSend}
                  disabled={status === 'sending'}
                  style={{ opacity: status === 'sending' ? 0.6 : 1 }}
                >
                  {status === 'sending' ? 'Dispatching thy missive…' : '✉ Dispatch the Missive'}
                </button>
                <WaxSeal letter="M" size={56} />
              </div>
            </div>
          </div>
        )}

        <QuillDivider />

        {/* ── Social links ── */}
        <div>
          <h2 style={{
            fontFamily: '"IM Fell English SC", serif',
            fontSize: '1.4rem',
            color: 'var(--text)',
            marginBottom: '1.2rem',
            textAlign: 'center',
          }}>
            Other Channels of Correspondence
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {SOCIAL_LINKS.map(s => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer"
                style={{ textDecoration: 'none' }}>
                <div className="parchment-card" style={{
                  padding: '1.3rem',
                  textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                }}>
                  <span style={{ fontSize: '1.6rem', color: 'var(--seal)' }}>{s.icon}</span>
                  <span style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '1rem', color: 'var(--text)' }}>
                    {s.label}
                  </span>
                  <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-faint)' }}>
                    {s.sublabel}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

// ─── Sent confirmation ────────────────────────────────────────────────────────
function SentConfirmation() {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      padding: '3.5rem 2.5rem',
      textAlign: 'center',
      boxShadow: '4px 4px 0 var(--shadow)',
    }}>
      <WaxSeal letter="✓" size={90} className="mx-auto mb-4" />
      <h2 style={{
        fontFamily: '"IM Fell English SC", serif',
        fontSize: '1.8rem',
        color: 'var(--text)',
        marginBottom: '0.8rem',
      }}>
        Thy Missive Hath Been Dispatched!
      </h2>
      <p style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontStyle: 'italic',
        fontSize: '1.15rem',
        color: 'var(--text-muted)',
        maxWidth: '420px',
        margin: '0 auto 2rem',
        lineHeight: 1.8,
      }}>
        The courier hath taken thy words and set forth with all haste.
        I shall endeavour to reply within a fortnight.
      </p>
      <InkOrnament variant="asterism" size={32} className="mx-auto" />
    </div>
  )
}

// ─── Label style ──────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  fontFamily: '"IM Fell English SC", serif',
  fontSize: '0.78rem',
  color: 'var(--text-faint)',
  display: 'block',
  marginBottom: '0.35rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
}
