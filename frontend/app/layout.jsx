import Link from 'next/link';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://romanticahq.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'RomanticaHQ',
    template: '%s | RomanticaHQ',
  },
  description: 'Modern dating for real people and intentional connections.',
  applicationName: 'RomanticaHQ',
  keywords: [
    'dating',
    'relationships',
    'intentional dating',
    'romantic connections',
    'dating app',
  ],
  openGraph: {
    title: 'RomanticaHQ',
    description:
      'A calm, intentional dating platform built for real people and real connection.',
    url: '/',
    siteName: 'RomanticaHQ',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RomanticaHQ',
    description:
      'A calm, intentional dating platform built for real people and real connection.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b1020',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        <div className="site-shell">
          <header className="site-header">
            <div className="site-header-inner">
              <Link href="/" className="logo">
                <span className="logo-mark" aria-hidden="true">
                  R
                </span>
                <span className="logo-text">RomanticaHQ</span>
              </Link>

              <nav className="site-nav" aria-label="Primary">
                <Link href="/auth/login" className="nav-link">
                  Log in
                </Link>
                <Link href="/auth/signup" className="button button-primary">
                  Join for free
                </Link>
              </nav>
            </div>
          </header>

          <main id="main-content" className="site-main">
            {children}
          </main>

          <footer className="site-footer">
            <div className="site-footer-inner">
              <span>
                © {new Date().getFullYear()} RomanticaHQ. All rights reserved.
              </span>
              <div className="footer-links">
                <Link href="/terms">Terms</Link>
                <Link href="/privacy">Privacy</Link>
                <Link href="/safety">Safety</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
