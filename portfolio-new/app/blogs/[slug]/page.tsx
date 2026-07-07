import { getBlogPost, getAllBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { BackLink } from '@/components/back-link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} / Priyanka Tiwari`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="w-full max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <BackLink href="/blogs" label="back to blogs" />

      <header className="mb-12">
        <h1
          className="text-3xl md:text-4xl font-semibold leading-tight mb-4"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
        >
          {post.title}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-[12px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            {post.date}
          </span>
          <span className="text-[12px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            {post.readingTime}
          </span>
        </div>
      </header>

      <div className="prose">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
