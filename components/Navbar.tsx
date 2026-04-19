'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavbarProps {
  dark:     boolean
  onToggle: () => void
}

const navLinks = [
  { href: '/',             label: 'The Great Hall' },
  { href: '/endeavours',   label: 'Endeavours'     },
  { href: '/artes',        label: 'Artes & Crafts' },
  { href: '/broadsheet',   label: 'The Broadsheet' },
  { href: '/missive',      label: 'Send Missive'   },
]

export default function Navbar({ dark, onToggle }: NavbarProps) {
  const pathname  = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      borderBottom: '1px solid var(--border-light)',
      background: 'var(--bg)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <nav style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0.9rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo / monogram */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: '"UnifrakturMaguntia", cursive',
            fontSize: '1.8rem',
            color: 'var(--seal)',
            lineHeight: 1,
            display: 'block',
          }}>
            Portfolio
          </span>
          <span style={{
            fontFamily: '"IM Fell English SC", serif',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            color: 'var(--text-faint)',
            display: 'block',
            textTransform: 'uppercase',
          }}>
            Artisan of the Digital Realm
          </span>
        </Link>

        {/* Desktop links */}
        <ul style={{
          display: 'flex', gap: '2rem',
          listStyle: 'none',
          alignItems: 'center',
        }} className="hidden md:flex">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link"
                style={{ color: pathname === link.href ? 'var(--seal)' : undefined }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme toggle + mobile menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

          {/* Candle toggle */}
          <button onClick={onToggle} aria-label="Toggle dark mode" style={{
            background: 'none', border: 'none',
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '0.1rem',
          }}>
            <CandleIcon dark={dark} />
            <span style={{
              fontFamily: '"IM Fell English SC", serif',
              fontSize: '0.55rem',
              color: 'var(--text-faint)',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
            }}>
              {dark ? 'Kindle Flame' : 'Extinguish'}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--seal)', fontSize: '1.4rem' }}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border-light)',
          padding: '1rem 2rem',
        }} className="md:hidden">
          {navLinks.map(link => (
            <div key={link.href} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border-light)' }}>
              <Link href={link.href} className="nav-link" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      )}
    </header>
  )
}

function CandleIcon({ dark }: { dark: boolean }) {
  return (
    <svg width="22" height="28" viewBox="0 0 22 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Flame */}
      {!dark && (
        <g className="animate-flicker">
          <path d="M11 8 C9 5 8 2 11 0 C14 2 13 5 11 8" fill="#f59e0b" />
          <path d="M11 7 C10 5 10 3 11 2 C12 3 12 5 11 7" fill="#fef3c7" />
        </g>
      )}
      {/* Wax drip */}
      <path d="M7 10 Q6 16 8 18 L14 18 Q16 16 15 10 Z" fill="var(--bg-card)" stroke="var(--border)" strokeWidth="0.8" />
      {/* Candle body */}
      <rect x="8" y="18" width="6" height="10" rx="1" fill="var(--bg-card)" stroke="var(--border)" strokeWidth="0.8" />
      {/* Wick */}
      <line x1="11" y1="10" x2="11" y2="12" stroke="#2C1A0E" strokeWidth="1" opacity={dark ? 0.3 : 0.8} />
      {/* Dark mode: snuffed */}
      {dark && <path d="M9 8 Q11 10 13 8" stroke="var(--text-faint)" strokeWidth="1" fill="none" />}
    </svg>
  )
}
