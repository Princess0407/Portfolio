import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';
import { SectionWrapper } from '@/components/section-wrapper';
import { Reveal } from '@/components/reveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs / Priyanka Tiwari',
  description: 'Thoughts on hardware, AI, security, and building things that matter.',
};

export default function BlogsPage() {
  const posts = getAllBlogPosts();

  return (
    <SectionWrapper label="writing" title="Blogs">
      {posts.length > 0 ? (
        <div className="space-y-1">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blogs/${post.slug}`}
                className="group block py-5 transition-all duration-200"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <div className="flex-1">
                    <h2
                      className="text-[16px] font-medium transition-colors duration-200 group-hover:text-[var(--accent)]"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="text-[14px] mt-1 leading-relaxed"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                    >
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[12px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                      {post.readingTime}
                    </span>
                    <span className="text-[12px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                      {post.date}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="py-16 text-center">
            <p
              className="text-lg mb-3"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-secondary)' }}
            >
              Nothing here yet.
            </p>
            <p className="text-[14px]" style={{ color: 'var(--text-tertiary)' }}>
              The first post is always the hardest to write.
              Come back soon.
            </p>
          </div>
        </Reveal>
      )}
    </SectionWrapper>
  );
}
