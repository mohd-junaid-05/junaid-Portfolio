import type { Metadata } from 'next';
import {
  Anton,
  Archivo,
  Instrument_Serif,
  JetBrains_Mono,
  Shippori_Mincho,
} from 'next/font/google';
import { BootstrapScript } from '@/components/layout/BootstrapScript';
import { ChapterRail } from '@/components/layout/ChapterRail';
import { CursorFx } from '@/components/layout/CursorFx';
import { GrainOverlay } from '@/components/layout/GrainOverlay';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { Preloader } from '@/components/motion/Preloader';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
});

const archivo = Archivo({
  weight: 'variable',
  axes: ['wdth'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument',
});

const jetbrainsMono = JetBrains_Mono({
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

const shipporiMincho = Shippori_Mincho({
  weight: '800',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-shippori',
});

export const metadata: Metadata = {
  title: 'Mohd Junaid — Developer Portfolio',
  description:
    'Personal developer portfolio of Mohd Junaid (B.Tech CSE, SCET Hyderabad) showcasing projects, technical stack, experience, credentials, and contact links.',
};

const fontVariables = [
  anton.variable,
  archivo.variable,
  instrumentSerif.variable,
  jetbrainsMono.variable,
  shipporiMincho.variable,
].join(' ');

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-theme="blood"
      data-motion="on"
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <BootstrapScript />
      </head>
      <body>
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <GrainOverlay />
          <CursorFx />
          <ChapterRail />
          <main id="main" tabIndex={-1}>
            <Preloader />
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
