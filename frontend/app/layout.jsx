import './globals.css';
import Link from 'next/link';
import Providers from './providers';

export const metadata = {
  title: 'RomanticaHQ',
  description: 'Modern dating platform for real people and real connections.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* HEADER */}
            <header
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                position: 'sticky',
                top: 0,
                zIndex: 20,
                backdropFilter: 'blur(12px)',
                background:
                  'linear-gradient(to right, rgba(15,23,42,0.9), rgba(24,24,27,0.9))',
                borderBottom: '1px solid rgba(148,163,184,0.25)',
              }}
            >
            <div
              className="rhq-header-inner"
              style={{
                maxWidth: 1040,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* LOGO */}
              <Link
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background:
                      'radial-gradient(circle at 30% 0, #f97316, #db2777)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  R
                </div>
                <span
                  style={{
                    color: 'white',
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                >
                  RomanticaHQ
                </span>
              </Link>

              {/* NAV */}
              <nav
                className="rhq-nav"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <Link
                  href="/auth/login"
                  style={{
                    color: '#e5e7eb',
                    fontSize: 14,
                    textDecoration: 'none',
                  }}
                >
                  Log in
                </Link>

                <Link
                  href="/auth/signup"
                  className="rhq-btn-primary"
                  style={{ padding: '0.55rem 1rem', fontSize: 14 }}
                >
                  Join for free
                </Link>
              </nav>
            </div>
            </header>

          {/* MAIN CONTENT */}
            <main style={{ flex: 1 }}>{children}</main>

          {/* FOOTER */}
            <footer
              style={{
                borderTop: '1px solid rgba(148,163,184,0.25)',
                backgroundColor: '#020617',
                padding: '1rem 1.5rem',
                color: '#9ca3af',
              }}
            >
            <div
              style={{
                maxWidth: 1040,
                margin: '0 auto',
                display: 'flex',
                flexWrap: 'wrap',
                rowGap: 8,
                columnGap: 16,
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 12,
              }}
            >
              <span>
                © {new Date().getFullYear()} RomanticaHQ. All rights reserved.
              </span>

              {/* FIXED FOOTER LINKS */}
              <div style={{ display: 'flex', gap: 12 }}>
                <Link href="/terms" style={{ color: '#e5e7eb', textDecoration: 'none' }}>
                  Terms
                </Link>
                <Link href="/privacy" style={{ color: '#e5e7eb', textDecoration: 'none' }}>
                  Privacy
                </Link>
                <Link href="/safety" style={{ color: '#e5e7eb', textDecoration: 'none' }}>
                  Safety
                </Link>
              </div>
            </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
