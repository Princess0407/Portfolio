'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/lightbox';
import { SectionWrapper } from '@/components/section-wrapper';
import { Reveal } from '@/components/reveal';

/* 
  Gallery images go in /public/gallery/
  Add your images here and update this array.
*/
const galleryImages: { src: string; alt: string; width: number; height: number }[] = [
  // Placeholder structure - add your images:
  // { src: '/gallery/photo1.jpg', alt: 'Description', width: 800, height: 600 },
];

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <SectionWrapper label="collection" title="Gallery">
        {galleryImages.length > 0 ? (
          <Reveal>
            <div className="masonry">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="group cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg"
                  onClick={() => setLightboxIndex(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(i)}
                  aria-label={`View ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="py-20 text-center">
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                style={{ background: 'var(--accent-dim)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <p
                className="text-lg mb-3"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-secondary)' }}
              >
                The gallery is being curated.
              </p>
              <p className="text-[14px]" style={{ color: 'var(--text-tertiary)' }}>
                Images will appear here soon.
              </p>
            </div>
          </Reveal>
        )}
      </SectionWrapper>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
