'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ThemeToggle } from './theme-toggle';

const tabs = [
  { name: 'Home', path: '/', isHome: true },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Poems', path: '/poems' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Mail', path: '/reach-out' },
];

export function DockNav() {
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname === '/') return '/';
    const match = tabs.find(t => t.path !== '/' && pathname.startsWith(t.path));
    return match?.path || '/';
  };

  const activeTab = getActiveTab();

  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 md:gap-6 px-4 md:px-5 py-2 rounded-full"
      style={{
        background: 'var(--frost-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--frost-border)',
        boxShadow: '0 8px 32px var(--shadow-color)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-2 md:gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.path;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className="relative px-3.5 py-1.5 text-[13px] md:text-[14px] tracking-wide rounded-full transition-colors duration-200 whitespace-nowrap flex items-center justify-center min-w-[36px]"
              style={{
                color: isActive ? 'var(--text)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontWeight: isActive ? 500 : 400,
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--border)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center">
                {tab.isHome ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ) : (
                  tab.name
                )}
              </span>
            </Link>
          );
        })}
      </div>

      <div
        className="w-px h-5"
        style={{ background: 'var(--border)' }}
      />

      <ThemeToggle />
    </nav>
  );
}
