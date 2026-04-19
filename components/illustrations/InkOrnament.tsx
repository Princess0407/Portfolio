// InkOrnament.tsx — small decorative inkblot/floral motifs

interface InkOrnamentProps {
  variant?: 'fleur' | 'asterism' | 'manicule' | 'dagger'
  size?: number
  className?: string
}

export default function InkOrnament({ variant = 'fleur', size = 32, className = '' }: InkOrnamentProps) {

  if (variant === 'asterism') {
    // ⁂ three asterisks
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
        className={className} aria-hidden="true">
        <text x="16" y="20" textAnchor="middle" fontSize="20" fill="var(--text-faint)"
          fontFamily="serif">⁂</text>
      </svg>
    )
  }

  if (variant === 'manicule') {
    // ☞ pointing hand / manicule - old book pointer
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
        className={className} aria-hidden="true">
        <text x="4" y="24" fontSize="24" fill="var(--seal)" fontFamily="serif">☞</text>
      </svg>
    )
  }

  if (variant === 'dagger') {
    // † dagger mark
    return (
      <svg width={size * 0.5} height={size} viewBox="0 0 16 32" xmlns="http://www.w3.org/2000/svg"
        className={className} aria-hidden="true">
        <rect x="7" y="0" width="2" height="32" rx="1" fill="var(--text-faint)" />
        <rect x="2" y="10" width="12" height="2" rx="1" fill="var(--text-faint)" />
      </svg>
    )
  }

  // fleur de lis / floral motif (default)
  return (
    <svg width={size} height={size} viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      {/* Center stem */}
      <line x1="20" y1="48" x2="20" y2="18" stroke="var(--text-faint)" strokeWidth="1.5" />
      {/* Center petal */}
      <path d="M20 18 C16 12 16 4 20 2 C24 4 24 12 20 18" fill="var(--text-faint)" opacity="0.7" />
      {/* Left petal */}
      <path d="M20 22 C14 20 6 22 4 26 C8 28 16 24 20 22" fill="var(--text-faint)" opacity="0.5" />
      {/* Right petal */}
      <path d="M20 22 C26 20 34 22 36 26 C32 28 24 24 20 22" fill="var(--text-faint)" opacity="0.5" />
      {/* Collar */}
      <rect x="16" y="26" width="8" height="3" rx="1" fill="var(--text-faint)" opacity="0.6" />
      {/* Base orb */}
      <ellipse cx="20" cy="38" rx="5" ry="6" fill="none"
        stroke="var(--text-faint)" strokeWidth="1.2" opacity="0.5" />
    </svg>
  )
}
