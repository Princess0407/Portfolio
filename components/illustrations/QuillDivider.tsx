// QuillDivider.tsx — an ornate horizontal divider with quill and flourishes

interface QuillDividerProps {
  className?: string
  variant?: 'full' | 'mini'
}

export default function QuillDivider({ className = '', variant = 'full' }: QuillDividerProps) {
  if (variant === 'mini') {
    return (
      <svg width="200" height="24" viewBox="0 0 200 24" xmlns="http://www.w3.org/2000/svg"
        className={className} aria-hidden="true">
        <line x1="0" y1="12" x2="78" y2="12" stroke="var(--border)" strokeWidth="0.8" />
        <path d="M88 12 C91 7 96 5 100 12 C104 19 109 17 112 12" fill="none"
          stroke="var(--text-faint)" strokeWidth="1" />
        <line x1="122" y1="12" x2="200" y2="12" stroke="var(--border)" strokeWidth="0.8" />
        <circle cx="100" cy="12" r="2" fill="var(--text-faint)" />
      </svg>
    )
  }

  return (
    <svg width="600" height="40" viewBox="0 0 600 40" xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-2xl mx-auto block ${className}`} aria-hidden="true">

      {/* Main horizontal lines */}
      <line x1="0"   y1="20" x2="205" y2="20" stroke="var(--border)" strokeWidth="0.8" />
      <line x1="395" y1="20" x2="600" y2="20" stroke="var(--border)" strokeWidth="0.8" />

      {/* Secondary lines */}
      <line x1="0"   y1="23" x2="200" y2="23" stroke="var(--border-light)" strokeWidth="0.4" />
      <line x1="400" y1="23" x2="600" y2="23" stroke="var(--border-light)" strokeWidth="0.4" />

      {/* Left flourish */}
      <path d="M200 20 Q220 8 240 20 Q220 32 200 20" fill="none"
        stroke="var(--text-faint)" strokeWidth="1" />
      <path d="M185 20 Q195 14 205 20 Q195 26 185 20" fill="none"
        stroke="var(--border)" strokeWidth="0.6" />

      {/* Center quill */}
      <g transform="translate(280, 2)">
        {/* Feather shaft */}
        <line x1="20" y1="36" x2="20" y2="4" stroke="var(--seal)" strokeWidth="1.2" />
        {/* Nib point */}
        <path d="M20 36 L17 40 L20 38 L23 40 Z" fill="var(--ink, #2C1A0E)" />
        {/* Left barbs */}
        <path d="M20 8  C14 10 8  14 4  16" fill="none" stroke="var(--seal)" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M20 12 C14 14 8  18 5  20" fill="none" stroke="var(--seal)" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M20 16 C14 18 9  22 6  24" fill="none" stroke="var(--seal)" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M20 20 C14 22 10 26 8  28" fill="none" stroke="var(--seal)" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M20 24 C15 26 11 29 10 31" fill="none" stroke="var(--seal)" strokeWidth="0.7" strokeLinecap="round" />
        {/* Right barbs */}
        <path d="M20 8  C26 10 32 14 36 16" fill="none" stroke="var(--seal)" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M20 12 C26 14 32 18 35 20" fill="none" stroke="var(--seal)" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M20 16 C26 18 31 22 34 24" fill="none" stroke="var(--seal)" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M20 20 C26 22 30 26 32 28" fill="none" stroke="var(--seal)" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M20 24 C25 26 29 29 30 31" fill="none" stroke="var(--seal)" strokeWidth="0.7" strokeLinecap="round" />
        {/* Tip highlight */}
        <path d="M20 6 C18 9 20 12 20 12 C20 12 22 9 20 6" fill="var(--seal)" opacity="0.5" />
      </g>

      {/* Right flourish */}
      <path d="M400 20 Q380 8 360 20 Q380 32 400 20" fill="none"
        stroke="var(--text-faint)" strokeWidth="1" />
      <path d="M415 20 Q405 14 395 20 Q405 26 415 20" fill="none"
        stroke="var(--border)" strokeWidth="0.6" />

      {/* Diamond accents */}
      <path d="M300 14 L304 20 L300 26 L296 20 Z" fill="var(--text-faint)" opacity="0.4" />
    </svg>
  )
}
