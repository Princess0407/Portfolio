'use client';

import { PinnedRepo } from '@/lib/types';
import { FrostedCard } from './frosted-card';
import { Reveal } from './reveal';

interface GitHubReposProps {
  repos: PinnedRepo[];
}

export function GitHubRepos({ repos }: GitHubReposProps) {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {repos.map((repo, i) => (
        <Reveal key={repo.name} delay={i * 0.06}>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <FrostedCard className="h-full group-hover:border-[var(--border-hover)]">
              <div className="flex items-start justify-between mb-2">
                <h3
                  className="text-[15px] font-medium transition-colors duration-200 group-hover:text-[var(--accent)]"
                  style={{ color: 'var(--text)', fontFamily: 'var(--font-serif)' }}
                >
                  {repo.name.replace(/-/g, ' ')}
                </h3>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 mt-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>

              {repo.description && (
                <p
                  className="text-[13px] leading-relaxed mb-4"
                  style={{ color: 'var(--text-secondary)', lineHeight: '1.65' }}
                >
                  {repo.description}
                </p>
              )}

              <div className="flex items-center gap-4 mt-auto">
                {repo.primaryLanguage && (
                  <span className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: repo.primaryLanguage.color }}
                    />
                    {repo.primaryLanguage.name}
                  </span>
                )}
                <span className="flex items-center gap-1 text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.568L24 9.306l-6 5.847 1.416 8.26L12 19.446l-7.416 3.967L6 15.153 0 9.306l8.332-1.151z"/></svg>
                  {repo.stargazerCount}
                </span>
                <span className="flex items-center gap-1 text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg>
                  {repo.forkCount}
                </span>
                <span className="text-[11px] ml-auto" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  {new Date(repo.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </FrostedCard>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
