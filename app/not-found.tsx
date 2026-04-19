'use client'

import Link from 'next/link'
import WaxSeal    from '@/components/illustrations/WaxSeal'
import QuillDivider from '@/components/illustrations/QuillDivider'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center',
    }}>
      {/* Giant background numeral */}
      <span style={{
        position: 'fixed',
        fontFamily: '"UnifrakturMaguntia", cursive',
        fontSize: '40vw',
        color: 'var(--border-light)',
        opacity: 0.12,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
        top: '50%',
        transform: 'translateY(-50%)',
      }}>
        404
      </span>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <WaxSeal letter="?" size={100} className="mx-auto mb-6" />

        <h1 style={{
          fontFamily: '"IM Fell English SC", serif',
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          color: 'var(--text)',
          marginBottom: '0.5rem',
        }}>
          Thou Hast Wandered into the Void
        </h1>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontSize: '1.2rem',
          color: 'var(--text-muted)',
          maxWidth: '480px',
          lineHeight: 1.8,
          margin: '0 auto 1rem',
        }}>
          The scroll thou seekest does not reside in these archives.
          Perchance it was never written, or hath been lost to the ages.
        </p>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: 'var(--text-faint)',
          marginBottom: '2.5rem',
        }}>
          — Error the CDV-th, in the Anno of our Lord MMXXVI —
        </p>

        <QuillDivider variant="mini" className="mb-6 mx-auto" />

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/">
            <button className="wax-btn">Return to the Great Hall</button>
          </Link>
          <Link href="/broadsheet">
            <button className="ink-btn">Visit the Broadsheet</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
