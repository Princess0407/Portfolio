'use client'

import { useState, useEffect } from 'react'
import { supabase, getReviews, addReview, type Review } from '@/lib/supabase'
import InkOrnament from './illustrations/InkOrnament'
import QuillDivider from './illustrations/QuillDivider'

interface ReviewSystemProps {
  postSlug: string
}

export default function ReviewSystem({ postSlug }: ReviewSystemProps) {
  const [reviews,  setReviews]  = useState<Review[]>([])
  const [loading,  setLoading]  = useState(true)
  const [author,   setAuthor]   = useState('')
  const [content,  setContent]  = useState('')
  const [quills,   setQuills]   = useState(0)       // 0 = not rated yet
  const [hovering, setHovering] = useState(0)
  const [sending,  setSending]  = useState(false)
  const [toast,    setToast]    = useState('')

  useEffect(() => {
    getReviews(postSlug)
      .then(data => { setReviews(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [postSlug])

  const avgQuills = reviews.length
    ? reviews.reduce((s, r) => s + r.quills, 0) / reviews.length
    : 0

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  async function handleSubmit() {
    if (!author.trim() || !content.trim() || quills === 0) {
      setToast('Prithee, fill in all fields and bestow thy quill rating.')
      setTimeout(() => setToast(''), 3000)
      return
    }
    setSending(true)
    try {
      const review = await addReview({ post_slug: postSlug, author, content, quills })
      setReviews(prev => [review, ...prev])
      setAuthor(''); setContent(''); setQuills(0)
      setToast('Thy testimonial hath been recorded in the annals!')
      setTimeout(() => setToast(''), 3500)
    } catch {
      setToast('Alas, a misfortune hath occurred. Try again anon.')
      setTimeout(() => setToast(''), 3000)
    }
    setSending(false)
  }

  return (
    <section style={{ marginTop: '4rem' }}>
      <QuillDivider />

      <div style={{ marginTop: '2.5rem' }}>
        <h2 style={{
          fontFamily: '"IM Fell English SC", serif',
          fontSize: '1.6rem',
          color: 'var(--seal)',
          marginBottom: '0.4rem',
        }}>
          Testimonials of the Realm
        </h2>

        {reviews.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
            <QuillRating value={avgQuills} readonly />
            <span style={{ color: 'var(--text-faint)', fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem' }}>
              {avgQuills.toFixed(1)} quills · {reviews.length} testimonial{reviews.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Existing reviews */}
        {loading ? (
          <p style={{ color: 'var(--text-faint)', fontStyle: 'italic' }}>Fetching the scrolls…</p>
        ) : reviews.length === 0 ? (
          <p style={{ color: 'var(--text-faint)', fontStyle: 'italic', marginBottom: '2rem' }}>
            <span style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4rem' }}>
              <InkOrnament variant="manicule" size={20} />
            </span>
            No testimonials yet. Be the first to inscribe thy thoughts.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {reviews.map(r => (
              <div key={r.id} className="parchment-card" style={{ padding: '1.2rem 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '1rem', color: 'var(--text)' }}>
                      {r.author}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-faint)', marginLeft: '0.8rem', fontStyle: 'italic' }}>
                      {formatDate(r.created_at)}
                    </span>
                  </div>
                  <QuillRating value={r.quills} readonly size={16} />
                </div>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.05rem', color: 'var(--text)', fontStyle: 'italic', margin: 0 }}>
                  "{r.content}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Submit form */}
        <div className="parchment-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '1.2rem', color: 'var(--text)', marginBottom: '1.5rem' }}>
            Leave Thine Thoughts
          </h3>

          <div style={{ display: 'grid', gap: '1.4rem' }}>
            <div>
              <label style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '0.8rem', color: 'var(--text-faint)', display: 'block', marginBottom: '0.3rem', letterSpacing: '0.08em' }}>
                Thy Name
              </label>
              <input
                className="quill-input"
                placeholder="How art thou called?"
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '0.8rem', color: 'var(--text-faint)', display: 'block', marginBottom: '0.3rem', letterSpacing: '0.08em' }}>
                Thy Testimonial
              </label>
              <textarea
                className="quill-textarea"
                placeholder="Inscribe thy thoughts upon this parchment…"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontFamily: '"IM Fell English SC", serif', fontSize: '0.8rem', color: 'var(--text-faint)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>
                Bestow Thy Quills
              </label>
              <QuillRating
                value={quills}
                hovered={hovering}
                onHover={setHovering}
                onSelect={setQuills}
              />
            </div>

            <button
              className="ink-btn"
              onClick={handleSubmit}
              disabled={sending}
              style={{ alignSelf: 'flex-start', opacity: sending ? 0.6 : 1 }}
            >
              {sending ? 'Dispatching…' : 'Submit Testimonial'}
            </button>
          </div>

          {toast && (
            <div className="toast" style={{ marginTop: '1rem' }}>
              {toast}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Quill Rating Sub-component ───────────────────────────────────────────────

function QuillRating({
  value, readonly = false, size = 20, hovered = 0,
  onHover, onSelect,
}: {
  value: number; readonly?: boolean; size?: number; hovered?: number;
  onHover?: (v: number) => void; onSelect?: (v: number) => void;
}) {
  const display = hovered || value
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(n => (
        <svg key={n} width={size} height={size * 1.4} viewBox="0 0 20 28"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: readonly ? 'default' : 'pointer', transition: 'transform 0.15s' }}
          aria-label={`${n} quill${n !== 1 ? 's' : ''}`}
          onMouseEnter={() => !readonly && onHover?.(n)}
          onMouseLeave={() => !readonly && onHover?.(0)}
          onClick={() => !readonly && onSelect?.(n)}
        >
          {/* Quill feather */}
          <line x1="10" y1="28" x2="10" y2="4" stroke={n <= display ? 'var(--seal)' : 'var(--border)'} strokeWidth="1.2" />
          {[6, 9, 12, 15, 18].map((y, i) => (
            <g key={i}>
              <line x1="10" y1={y} x2={10 - 7 + i} y2={y + 3}
                stroke={n <= display ? 'var(--seal)' : 'var(--border)'}
                strokeWidth="0.8" strokeLinecap="round" />
              <line x1="10" y1={y} x2={10 + 7 - i} y2={y + 3}
                stroke={n <= display ? 'var(--seal)' : 'var(--border)'}
                strokeWidth="0.8" strokeLinecap="round" />
            </g>
          ))}
          <path d="M10 28 L8 26 L10 27 L12 26 Z" fill={n <= display ? 'var(--seal)' : 'var(--border)'} />
        </svg>
      ))}
    </div>
  )
}
