import { getPoem, getAllPoems } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { BackLink } from '@/components/back-link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const poems = getAllPoems();
  return poems.map((poem) => ({ slug: poem.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const poem = getPoem(slug);
  if (!poem) return {};
  return {
    title: `${poem.title} / Priyanka Tiwari`,
  };
}

export default async function PoemPage({ params }: Props) {
  const { slug } = await params;
  const poem = getPoem(slug);

  if (!poem) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <BackLink href="/poems" label="back to poems" />

      <header className="text-center mb-12 mt-4">
        <h1
          className="text-2xl md:text-3xl font-semibold mb-3"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
        >
          {poem.title}
        </h1>
        <span className="text-[12px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          {poem.date}
        </span>
      </header>

      <div className="poem-body">
        <MDXRemote source={poem.content} />
      </div>
    </div>
  );
}
