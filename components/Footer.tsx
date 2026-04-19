'use client'

import InkOrnament from './illustrations/InkOrnament'

export default function Footer() {
  const year = new Date().getFullYear()
  // Convert year to roman numerals
  const toRoman = (n: number) => {
    const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
    const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I']
    let result = ''
    vals.forEach((v, i) => { while (n >= v) { result += syms[i]; n -= v } })
    return result
  }

  return (
    <footer style={{
      borderTop: '1px solid var(--border-light)',
      padding: '3rem 2rem 2rem',
      marginTop: '4rem',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <InkOrnament variant="fleur" size={48} />
        </div>

        <p style={{
          fontFamily: '"IM Fell English SC", serif',
          fontSize: '0.8rem',
          color: 'var(--text-faint)',
          letterSpacing: '0.12em',
          marginBottom: '0.8rem',
        }}>
          Crafted with quill & compiler · Anno Domini {toRoman(year)}
        </p>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: 'var(--text-faint)',
          marginBottom: '1.5rem',
        }}>
          "What a piece of work is a man, how noble in reason, how infinite in faculties."
          <br />
          <span style={{ fontSize: '0.8rem', fontStyle: 'normal' }}>— W. Shakespeare</span>
        </p>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          {[
            { href: 'https://github.com',    label: 'Scriptorium' },
            { href: 'https://linkedin.com',  label: 'Guild Hall'  },
            { href: '/broadsheet',           label: 'Broadsheet'  },
            { href: '/missive',              label: 'Missive'     },
          ].map(link => (
            <a key={link.href} href={link.href}
              style={{
                fontFamily: '"IM Fell English SC", serif',
                fontSize: '0.75rem',
                color: 'var(--text-faint)',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e: any) => (e.currentTarget.style.color = 'var(--seal)')}
              onMouseLeave={(e: any) => (e.currentTarget.style.color = 'var(--text-faint)')}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
