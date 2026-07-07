'use client';

import { ContributionWeek } from '@/lib/types';
import { Reveal } from './reveal';
import { useState } from 'react';

interface GitHubHeatmapProps {
  weeks: ContributionWeek[];
}

const levelColors: Record<string, string> = {
  NONE: 'var(--heatmap-0)',
  FIRST_QUARTILE: 'var(--heatmap-1)',
  SECOND_QUARTILE: 'var(--heatmap-2)',
  THIRD_QUARTILE: 'var(--heatmap-3)',
  FOURTH_QUARTILE: 'var(--heatmap-4)',
};

export function GitHubHeatmap({ weeks }: GitHubHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  if (!weeks || weeks.length === 0) return null;

  const recent = weeks.slice(-26);

  return (
    <Reveal delay={0.1}>
      <div className="relative mt-16 md:mt-20">
        <div className="overflow-x-auto pb-2">
          <div className="heatmap-grid" style={{ width: 'fit-content', margin: '0 auto' }}>
            {recent.map((week, wi) =>
              week.contributionDays.map((day, di) => (
                <div
                  key={`${wi}-${di}`}
                  className="heatmap-cell cursor-default"
                  style={{ background: levelColors[day.contributionLevel] || levelColors.NONE }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({
                      text: `${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''} on ${day.date}`,
                      x: rect.left + rect.width / 2,
                      y: rect.top - 8,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  role="gridcell"
                  aria-label={`${day.contributionCount} contributions on ${day.date}`}
                />
              ))
            )}
          </div>
        </div>

        {tooltip && (
          <div
            className="fixed z-50 pointer-events-none px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {tooltip.text}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 mt-3">
          <span className="text-[11px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>less</span>
          {['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'].map((level) => (
            <div
              key={level}
              className="w-[10px] h-[10px] rounded-sm"
              style={{ background: levelColors[level] }}
            />
          ))}
          <span className="text-[11px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>more</span>
        </div>
      </div>
    </Reveal>
  );
}
