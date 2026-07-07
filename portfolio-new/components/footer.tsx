'use client';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="pb-24 pt-12 text-center"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <p
        className="text-[13px] tracking-wide"
        style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
      >
        {year} / built with heart and curiosity
      </p>
      <a
        href="https://github.com/Princess0407"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-[12px] tracking-wider transition-colors duration-200"
        style={{ color: 'var(--text-tertiary)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
      >
        github.com/Princess0407
      </a>
    </footer>
  );
}
