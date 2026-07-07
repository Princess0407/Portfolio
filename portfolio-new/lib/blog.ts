import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, Poem } from './types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blogs');
const POEMS_DIR = path.join(process.cwd(), 'content', 'poems');

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  
  const posts = files.map(filename => {
    const slug = filename.replace(/\.(mdx|md)$/, '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);
    
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      readingTime: stats.text,
      content,
    };
  });
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(p => p.slug === slug) || null;
}

export function getAllPoems(): Poem[] {
  if (!fs.existsSync(POEMS_DIR)) return [];
  
  const files = fs.readdirSync(POEMS_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  
  const poems = files.map(filename => {
    const slug = filename.replace(/\.(mdx|md)$/, '');
    const filePath = path.join(POEMS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      content,
    };
  });
  
  return poems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPoem(slug: string): Poem | null {
  const poems = getAllPoems();
  return poems.find(p => p.slug === slug) || null;
}
