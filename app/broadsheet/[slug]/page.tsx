'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug, type BlogPost } from '@/lib/supabase'
import ReviewSystem  from '@/components/ReviewSystem'
import QuillDivider  from '@/components/illustrations/QuillDivider'
import InkOrnament   from '@/components/illustrations/InkOrnament'

// Fallback content for the seeded post
const FALLBACK: BlogPost = {
  id:         'fallback',
  slug:       'the-intelligent-engine',
  title:      'The Intelligent Engine: A Hardware Odyssey',
  excerpt:    'Wherein I recount the arduous journey of fashioning hardware that doth run AI models locally.',
  read_time:  8,
  tags:       ['Hardware', 'AI', 'Embedded Systems'],
  created_at: new Date().toISOString(),
  content: `
It began, as most grand endeavours do, with a grievance. The cloud, for all its marvelled conveniences, demands fealty — in coin, in latency, and in the quiet surrender of one's private thoughts to distant servers whose allegiances one cannot fully ascertain.

## The Genesis of an Idea

I had long grown weary of sending queries to machines that reside in datacentres scattered across continents, hoping they would return answers before the moment had passed. The latency was tolerable, but the dependency was not.

And so I resolved: to build a device that thinks *here*, on one's own desk, answerable to no cloud and beholden to no subscription.

## The Architecture

The design centres upon a custom system-on-chip featuring dedicated neural processing units. Unlike general-purpose GPUs — large, power-hungry, and expensive — these units are tuned specifically for the matrix multiplications that dominate transformer inference.

The memory subsystem presented the first great challenge. Transformers are memory-bandwidth-bound; one may have the most capable arithmetic units in the realm, yet if they sit idle awaiting data from DRAM, the device is no faster than a common laptop.

The solution lay in high-bandwidth on-chip SRAM acting as a working set cache, with careful tiling of the attention mechanism to maximise reuse.

## The Firmware

A device without good software is mere sculpture. The firmware required a runtime capable of:

- Loading quantised model weights from flash storage
- Managing the KV-cache efficiently across layers
- Scheduling compute and memory operations to overlap latency
- Exposing a simple API for applications to query

Writing this in C++ was illuminating. Every allocation is visible. Every cache miss is felt.

## Current State of the Realm

The prototype doth presently execute the LLaMA-3.2-1B model at twelve tokens per second on-device — a promising result. The 3B parameter model runs at four tokens per second, which is acceptable for many tasks. The 7B model remains aspirational.

The journey continues. There is much left to build.
`,
}

function toRoman(n: number) {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
  const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I']
  let r = ''
  vals.forEach((v,i) => { while(n>=v){r+=syms[i];n-=v} })
  return r
}

function formatOldDate(iso: string) {
  const d = new Date(iso)
  return `${toRoman(d.getDate())} ${d.toLocaleDateString('en-GB',{month:'long'})}, ${toRoman(d.getFullYear())}`
}

export default function BlogPostPage() {
  const params           = useParams()
  const slug             = params?.slug as string
  const [post, setPost]  = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const articleRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!slug) return
    getPostBySlug(slug)
      .then(data => setPost(data ?? FALLBACK))
      .catch(() => setPost(FALLBACK))
      .finally(() => setLoading(false))
  }, [slug])

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const vh = window.innerHeight
      const scrolled = Math.max(0, vh - top)
      const pct = Math.min(100, (scrolled / height) * 100)
      setProgress(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'var(--text-faint)', fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif' }}>
        Unfurling the scroll…
      </div>
    )
  }

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
        <h1 style={{ fontFamily: '"IM Fell English SC", serif', color: 'var(--text)', marginBottom: '1rem' }}>
          Alas, this scroll is not found
        </h1>
        <Link href="/broadsheet" className="ink-btn" style={{ display: 'inline-block' }}>
          Return to the Broadsheet
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Reading progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, zIndex: 200,
        height: '3px',
        width: `${progress}%`,
        background: 'linear-gradient(to right, var(--seal), var(--wax))',
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '4rem 2rem' }}>

        {/* Back link */}
        <Link href="/broadsheet" style={{
          fontFamily: '"IM Fell English SC", serif',
          fontSize: '0.85rem',
          color: 'var(--text-faint)',
          textDecoration: 'none',
          letterSpacing: '0.06em',
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          marginBottom: '2.5rem',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--seal)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}>
          ← Return to the Broadsheet
        </Link>

        {/* Post header */}
        <header style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {post.tags.map(t => <span key={t} className="tag-badge">{t}</span>)}
          </div>

          <h1 style={{
            fontFamily: '"IM Fell English SC", serif',
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            color: 'var(--text)',
            lineHeight: 1.2,
            marginBottom: '1rem',
          }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{
              fontFamily: '"IM Fell English SC", serif',
              fontSize: '0.78rem',
              color: 'var(--text-faint)',
              letterSpacing: '0.08em',
            }}>
              📜 {formatOldDate(post.created_at)}
            </span>
            <span style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              color: 'var(--text-faint)',
            }}>
              ✒️ A {post.read_time}-minute read
            </span>
          </div>
        </header>

        <QuillDivider variant="mini" className="mb-8" />

        {/* Article body with drop cap */}
        <article ref={articleRef} className="prose-old drop-cap">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* Footer ornament */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '3rem 0' }}>
          <InkOrnament variant="asterism" size={36} />
        </div>

        {/* Review system */}
        <ReviewSystem postSlug={post.slug} />

        {/* Bottom nav */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <Link href="/broadsheet">
            <button className="ink-btn">← More from the Broadsheet</button>
          </Link>
        </div>
      </div>
    </>
  )
}
