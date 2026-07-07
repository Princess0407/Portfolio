import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DockNav } from "@/components/dock-nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Priyanka Tiwari",
  description: "Low Level Systems Designer. Building hardware for on-device AI inference and tools that make the internet safer.",
  openGraph: {
    title: "Priyanka Tiwari",
    description: "Low Level Systems Designer. Building hardware for on-device AI inference and tools that make the internet safer.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <DockNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
