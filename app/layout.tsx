'use client'

import './globals.css'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    // Restore saved preference
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') { setDark(true); document.documentElement.classList.add('dark') }
  }, [])

  const toggleTheme = () => {
    setDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Thy Portfolio — Artisan of the Digital Realm</title>
        <meta name="description" content="The personal portfolio and broadsheet of a craftsman in software and silicon." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=UnifrakturMaguntia&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar dark={dark} onToggle={toggleTheme} />
        <main className="page-enter">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
