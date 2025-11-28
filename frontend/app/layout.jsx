export const metadata = {
  title: 'RomanticaHQ',
  description: 'Modern dating platform for real people and real connections.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          backgroundColor: '#0b1120',
          color: '#020617',
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
              style={{
                maxWidth: 1040,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <a
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
              </a>

              <nav
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <a
                  href="/auth/login"
                  style={{
                    color: '#e5e7eb',
                    fontSize: 14,
                    textDecoration: 'none',
                  }}
                >
                  Log in
                </a>
                <a
                  href="/auth/signup"
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: 999,
                    background:
                      'linear-gradient(135deg, #f97316, #db2777, #6366f1)',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Join for free
                </a>
              </nav>
            </div>
          </header>

          <main style={{ flex: 1 }}>{children}</main>

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
              <span>© {new Date().getFullYear()} RomanticaHQ. All rights reserved.</span>
              <div style={{ display: 'flex', gap: 12 }}>
                <a href="#" style={{ color: '#e5e7eb', textDecoration: 'none' }}>
                  Terms
                </a>
                <a href="#" style={{ color: '#e5e7eb', textDecoration: 'none' }}>
                  Privacy
                </a>
                <a href="#" style={{ color: '#e5e7eb', textDecoration: 'none' }}>
                  Safety
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
