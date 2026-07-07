import Link from 'next/link';
import { getAllPoems } from '@/lib/blog';
import { SectionWrapper } from '@/components/section-wrapper';
import { Reveal } from '@/components/reveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Poems / Priyanka Tiwari',
  description: 'Poetry, verse, and other quiet things.',
};

export default function PoemsPage() {
  const poems = getAllPoems();

  return (
    <SectionWrapper label="verse" title="Poems">
      {poems.length > 0 ? (
        <div className="space-y-1">
          {poems.map((poem, i) => (
            <Reveal key={poem.slug} delay={i * 0.05}>
              <Link
                href={`/poems/${poem.slug}`}
                className="group block py-5 transition-all duration-200"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <h2
                  className="text-[16px] font-medium transition-colors duration-200 group-hover:text-[var(--accent)]"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
                >
                  {poem.title}
                </h2>
                <span className="text-[12px] mt-1 block" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  {poem.date}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="py-20 text-center max-w-md mx-auto">
            <p
              className="text-xl mb-5 leading-relaxed"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-secondary)' }}
            >
              &ldquo;Poetry is when an emotion has found its thought and the thought has found words.&rdquo;
            </p>
            <p className="text-[13px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              Robert Frost
            </p>
            <p className="text-[14px] mt-8" style={{ color: 'var(--text-tertiary)' }}>
              This page is waiting for its first poem.
              Check back later.
            </p>
          </div>
        </Reveal>
      )}
    </SectionWrapper>
  );
}
