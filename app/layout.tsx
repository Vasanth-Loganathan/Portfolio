import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import CustomCursor from '@/components/custom-cursor'
import ScrollProgress from '@/components/scroll-progress'
import ScrollRestorer from '@/components/scroll-restorer'
import './globals.css'

import DoodleBackground from '@/components/doodle-background'

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Vasanth's Portfolio",
  description: 'Your Next Door Software Developer and Data Analyst',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🧑‍💻</text></svg>',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background dark">
      <body className="font-sans antialiased bg-background text-foreground">

        {/* Subtle background doodles — z:0 */}
        <DoodleBackground />

        {/* Crosshair cursor — z:9999 */}
        <CustomCursor />

        {/* All page content */}
        <div className="relative" style={{ zIndex: 3 }}>
          <ScrollRestorer />
          <ScrollProgress />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </div>

      </body>
    </html>
  )
}