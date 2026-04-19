// ScrollIllustration.tsx — decorative open scroll backdrop for project cards

interface ScrollIllustrationProps {
  width?:  number
  height?: number
  className?: string
}

export default function ScrollIllustration({ width = 400, height = 260, className = '' }: ScrollIllustrationProps) {
  return (
    <svg width={width} height={height} viewBox={`0 0 400 260`}
      xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">

      {/* Main scroll body */}
      <rect x="20" y="30" width="360" height="200" rx="4" fill="var(--bg-card)"
        stroke="var(--border)" strokeWidth="1" />

      {/* Top curl — left */}
      <path d="M20 30 Q20 12 36 10 Q52 8 52 24 Q52 36 36 36 Q28 36 20 30"
        fill="var(--bg-card2)" stroke="var(--border)" strokeWidth="1" />
      {/* Top curl shadow */}
      <path d="M20 30 Q26 32 36 30 Q46 28 52 24"
        fill="none" stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />

      {/* Top curl — right */}
      <path d="M380 30 Q380 12 364 10 Q348 8 348 24 Q348 36 364 36 Q372 36 380 30"
        fill="var(--bg-card2)" stroke="var(--border)" strokeWidth="1" />

      {/* Bottom curl — left */}
      <path d="M20 230 Q20 248 36 250 Q52 252 52 236 Q52 224 36 224 Q28 224 20 230"
        fill="var(--bg-card2)" stroke="var(--border)" strokeWidth="1" />

      {/* Bottom curl — right */}
      <path d="M380 230 Q380 248 364 250 Q348 252 348 236 Q348 224 364 224 Q372 224 380 230"
        fill="var(--bg-card2)" stroke="var(--border)" strokeWidth="1" />

      {/* Inner margin lines */}
      <line x1="60" y1="42" x2="340" y2="42" stroke="var(--border-light)" strokeWidth="0.5" />
      <line x1="60" y1="218" x2="340" y2="218" stroke="var(--border-light)" strokeWidth="0.5" />

      {/* Horizontal text lines (decorative) */}
      {[72, 92, 112, 132, 152, 172, 192].map((y, i) => (
        <line key={i} x1="60" y1={y} x2={i % 3 === 2 ? 260 : 340} y2={y}
          stroke="var(--border-light)" strokeWidth="0.4" opacity="0.5" />
      ))}
    </svg>
  )
}
