'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export function HeroBanner() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto px-5 md:px-8 py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative w-full overflow-hidden rounded-3xl"
        style={{
          aspectRatio: '16/9',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
        }}
      >
        <Image
          src="/banner.gif"
          alt="Portfolio banner"
          fill
          priority
          className={`object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          unoptimized
        />
        {!loaded && (
          <div
            className="absolute inset-0 animate-pulse"
            style={{ background: 'var(--bg-elevated)' }}
          />
        )}
      </motion.div>
    </div>
  );
}
