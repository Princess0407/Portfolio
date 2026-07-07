'use client';

import { SkillCategory } from '@/lib/types';
import { Reveal } from './reveal';

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['Python', 'C / C++', 'TypeScript', 'Rust', 'Assembly', 'JavaScript'],
  },
  {
    name: 'Frameworks',
    skills: ['Next.js', 'PyTorch', 'React', 'Node.js'],
  },
  {
    name: 'Backend & Systems',
    skills: ['Linux', 'Docker', 'Systems Programming', 'LLVM'],
  },
  {
    name: 'AI / ML',
    skills: ['Machine Learning', 'Neural Networks', 'On-device Inference', 'Computer Vision'],
  },
  {
    name: 'Developer Tools',
    skills: ['Git', 'Vim', 'VS Code', 'GDB', 'Wireshark'],
  },
  {
    name: 'Security',
    skills: ['Static Analysis', 'Sandboxing', 'Browser Extensions', 'Reverse Engineering'],
  },
];

export function SkillsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10">
      {skillCategories.map((category, ci) => (
        <Reveal key={category.name} delay={ci * 0.05}>
          <div>
            <h3
              className="text-[11px] tracking-[0.14em] uppercase mb-4"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
            >
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[13px] px-3 py-1 rounded-full transition-all duration-200 cursor-default"
                  style={{
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text)';
                    e.currentTarget.style.background = 'var(--accent-dim)';
                    e.currentTarget.style.borderColor = 'var(--border-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
