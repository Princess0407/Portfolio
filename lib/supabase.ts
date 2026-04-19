import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id:         string
  slug:       string
  title:      string
  excerpt:    string
  content:    string
  created_at: string
  read_time:  number          // minutes
  tags:       string[]
}

export interface Review {
  id:         string
  post_slug:  string
  author:     string
  content:    string
  quills:     number          // 1-5 (replaces stars)
  created_at: string
}

// ─── API helpers ──────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

export async function getReviews(postSlug: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('post_slug', postSlug)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function addReview(
  review: Omit<Review, 'id' | 'created_at'>
): Promise<Review> {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review)
    .select()
    .single()
  if (error) throw error
  return data
}

/*
──────────────────────────────────────────────────────────────────────────────
  SUPABASE SQL SCHEMA
  Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)
──────────────────────────────────────────────────────────────────────────────

create table posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  excerpt     text,
  content     text not null,
  read_time   int default 5,
  tags        text[] default '{}',
  created_at  timestamptz default now()
);

create table reviews (
  id          uuid primary key default gen_random_uuid(),
  post_slug   text references posts(slug) on delete cascade,
  author      text not null,
  content     text not null,
  quills      int check (quills between 1 and 5) not null,
  created_at  timestamptz default now()
);

-- Row Level Security: allow public reads, authenticated writes
alter table posts   enable row level security;
alter table reviews enable row level security;

create policy "Public read posts"   on posts   for select using (true);
create policy "Public read reviews" on reviews for select using (true);
create policy "Anyone can review"   on reviews for insert with check (true);

-- Seed with a sample post
insert into posts (slug, title, excerpt, content, read_time, tags) values (
  'the-intelligent-engine',
  'The Intelligent Engine: A Hardware Odyssey',
  'Wherein I recount the arduous yet rewarding journey of fashioning hardware that doth run AI models locally, without recourse to the cloud.',
  '## The Genesis of an Idea

  It began, as most grand endeavours do, with a grievance. The cloud, for all its conveniences, demands fealty — in coin, in latency, and in the surrender of one''s private data to distant servers.

  ## The Design

  The architecture centres upon a custom SoC with dedicated neural processing units...

  ## Current State of the Realm

  The prototype doth run LLaMA-3.2 at 12 tokens per second on-device. The journey continues.',
  8,
  ARRAY['hardware', 'AI', 'embedded systems']
);
*/
