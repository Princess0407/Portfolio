// WaxSeal.tsx — an animated wax seal SVG illustration
// Used on homepage hero, section headers, and 404

interface WaxSealProps {
  letter?: string   // single character to engrave
  size?:   number
  className?: string
}

export default function WaxSeal({ letter = 'P', size = 120, className = '' }: WaxSealProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-wax-drop ${className}`}
      style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))' }}
      aria-hidden="true"
    >
      {/* Outer drip blobs for wax effect */}
      <ellipse cx="60" cy="62" rx="52" ry="50" fill="var(--wax)" opacity="0.9" />
      <ellipse cx="60" cy="60" rx="50" ry="48" fill="var(--wax)" />

      {/* Wax drips */}
      <path d="M 20 75 Q 14 88 18 95 Q 22 90 24 78 Z" fill="var(--wax)" />
      <path d="M 95 72 Q 104 82 101 92 Q 97 86 93 76 Z" fill="var(--wax)" />
      <path d="M 55 108 Q 52 118 58 120 Q 62 116 63 108 Z" fill="var(--wax)" />

      {/* Inner circle (embossed look) */}
      <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="38" fill="rgba(0,0,0,0.08)" />
      <circle cx="60" cy="60" r="36" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

      {/* Radial lines (seal texture) */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16
        const rad   = (angle * Math.PI) / 180
        const x1 = 60 + 26 * Math.cos(rad), y1 = 60 + 26 * Math.sin(rad)
        const x2 = 60 + 36 * Math.cos(rad), y2 = 60 + 36 * Math.sin(rad)
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        )
      })}

      {/* Engraved letter */}
      <text
        x="60" y="68"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily='"IM Fell English SC", serif'
        fontSize="32"
        fill="rgba(255,255,255,0.85)"
        style={{ letterSpacing: '0.05em' }}
      >
        {letter}
      </text>

      {/* Highlight gloss */}
      <ellipse cx="45" cy="44" rx="12" ry="8"
        fill="rgba(255,255,255,0.1)" transform="rotate(-30 45 44)" />
    </svg>
  )
}
