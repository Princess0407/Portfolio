'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllPosts, type BlogPost } from '@/lib/supabase'
import QuillDivider from '@/components/illustrations/QuillDivider'
import InkOrnament  from '@/components/illustrations/InkOrnament'

const SEED_POSTS: BlogPost[] = [
  {
    id:         '1',
    slug:       'the-intelligent-engine',
    title:      'The Intelligent Engine: A Hardware Odyssey',
    excerpt:    'Wherein I recount the arduous yet rewarding journey of fashioning hardware that doth run AI models locally, without recourse to the cloud.',
    content:    '',
    created_at: new Date().toISOString(),
    read_time:  8,
    tags:       ['Hardware', 'AI', 'Embedded Systems'],
  },
  {
    id:         '2',
    slug:       'the-deceivers-snare',
    title:      "The Deceiver's Snare: Unmasking False Repositories",
    excerpt:    'A chronicling of how I fashioned an extension to detect malicious GitHub repositories by seeding counterfeit code and observing what the adversary doth attempt.',
    content:    '',
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    read_time:  6,
    tags:       ['Security', 'Browser Extension', 'JavaScript'],
  },
  {
    id:         '3',
    slug:       'on-local-inference',
    title:      'On the Virtue of Local Inference',
    excerpt:    'Why running AI models on one\'s own device is not merely a technical preference but a matter of sovereignty, privacy, and principle.',
    content:    '',
    created_at: new Date(Date.now() - 21 * 86400000).toISOString(),
    read_time:  5,
    tags:       ['AI', 'Philosophy', 'Privacy'],
  },
]

// Roman numeral helper
function toRoman(n: number): string {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
  const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I']
  let r = ''
  vals.forEach((v, i) => { while (n >= v) { r += syms[i]; n -= v } })
  return r
}

function formatOldDate(iso: string) {
  const d = new Date(iso)
  const day   = toRoman(d.getDate())
  const month = d.toLocaleDateString('en-GB', { month: 'long' })
  const year  = toRoman(d.getFullYear())
  return `${day} ${month}, ${year}`
}

function readTimeOld(mins: number) {
  if (mins <= 5)  return "A brief quarter-hour's read"
  if (mins <= 10) return "Half an hour's read"
  return "An hour's read"
}

export default function BroadsheetPage() {
  const [posts, setPosts]   = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState<string>('All')

  useEffect(() => {
    getAllPosts()
      .then(data => setPosts(data.length ? data : SEED_POSTS))
      .catch(() => setPosts(SEED_POSTS))
      .finally(() => setLoading(false))
  }, [])

  // Collect all tags
  const allTags = ['All', ...Array.from(new Set(posts.flatMap(p => p.tags)))]
  const filtered = filter === 'All' ? posts : posts.filter(p => p.tags.includes(filter))

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>

      {/* Masthead */}
      <div style={{
        textAlign: 'center',
        borderBottom: '2px solid var(--border)',
        borderTop:    '2px solid var(--border)',
        padding: '2rem 1rem',
        marginBottom: '3rem',
        position: 'relative',
      }}>
        {/* Corner ornaments */}
        <span style={{ position: 'absolute', top: 8, left: 12, color: 'var(--border)', fontSize: '1rem' }}>✦</span>
        <span style={{ position: 'absolute', top: 8, right: 12, color: 'var(--border)', fontSize: '1rem' }}>✦</span>
        <span style={{ position: 'absolute', bottom: 8, left: 12, color: 'var(--border)', fontSize: '1rem' }}>✦</span>
        <span style={{ position: 'absolute', bottom: 8, right: 12, color: 'var(--border)', fontSize: '1rem' }}>✦</span>

        <p style={{
          fontFamily: '"IM Fell English SC", serif',
          fontSize: '0.7rem',
          letterSpacing: '0.22em',
          color: 'var(--text-faint)',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          Published for the Enlightenment of the Realm
        </p>
        <h1 className="fraktur" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--text)', lineHeight: 1.1, marginBottom: '0.3rem' }}>
          The Broadsheet
        </h1>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          color: 'var(--text-faint)',
          fontSize: '1rem',
        }}>
          Musings, chronicles, and dispatches from the workshop
        </p>
      </div>

      {/* Tag filter */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {allTags.map(tag => (
          <button key={tag}
            onClick={() => setFilter(tag)}
            style={{
              fontFamily: '"IM Fell English SC", serif',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              border: `1px solid ${filter === tag ? 'var(--seal)' : 'var(--border)'}`,
              background: filter === tag ? 'var(--seal)' : 'transparent',
              color: filter === tag ? '#fdebd0' : 'var(--text-faint)',
              padding: '0.3rem 0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
            {tag}
          </button>
        ))}
      </div>

      {/* Posts list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-faint)', fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif' }}>
          Retrieving scrolls from the archive…
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {filtered.map((post, i) => (
            <div key={post.id}>
              {i > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0' }}>
                  <InkOrnament variant="dagger" size={28} />
                </div>
              )}
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-faint)', fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif', padding: '3rem' }}>
          No scrolls match this filter. Try another category.
        </p>
      )}

      <QuillDivider className="mt-12" />

      <p style={{
        textAlign: 'center',
        fontFamily: '"Cormorant Garamond", serif',
        fontStyle: 'italic',
        color: 'var(--text-faint)',
        marginTop: '2rem',
        fontSize: '0.95rem',
      }}>
        More dispatches shall appear as the quill moves. Return anon.
      </p>
    </div>
  )
}

// ─── Post card ────────────────────────────────────────────────────────────────
function PostCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/broadsheet/${post.slug}`} style={{ textDecoration: 'none' }}>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: '2rem 1.5rem',
          background: hovered ? 'var(--bg-card)' : 'transparent',
          borderLeft: `3px solid ${hovered ? 'var(--seal)' : 'transparent'}`,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        }}>

        {/* Date & read time */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: '"IM Fell English SC", serif',
            fontSize: '0.72rem',
            color: 'var(--text-faint)',
            letterSpacing: '0.08em',
          }}>
            📜 {formatOldDate(post.created_at)}
          </span>
          <span style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: '0.8rem',
            color: 'var(--text-faint)',
          }}>
            ✒️ {readTimeOld(post.read_time)}
          </span>
        </div>

        <h2 style={{
          fontFamily: '"IM Fell English SC", serif',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          color: hovered ? 'var(--seal)' : 'var(--text)',
          marginBottom: '0.5rem',
          transition: 'color 0.2s',
          lineHeight: 1.3,
        }}>
          {post.title}
        </h2>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          lineHeight: 1.75,
          marginBottom: '1rem',
        }}>
          {post.excerpt}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {post.tags.map(tag => (
            <span key={tag} className="tag-badge">{tag}</span>
          ))}
          <span style={{
            marginLeft: 'auto',
            fontFamily: '"IM Fell English SC", serif',
            fontSize: '0.8rem',
            color: 'var(--seal)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s',
          }}>
            Read the Dispatch →
          </span>
        </div>
      </article>
    </Link>
  )
}
