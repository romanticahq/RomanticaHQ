export default function HomePage() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        background:
          'radial-gradient(circle at top, rgba(251,113,133,0.16), transparent 55%), radial-gradient(circle at bottom, rgba(129,140,248,0.16), transparent 55%), #020617',
        display: 'flex',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: 1040,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
          gap: 32,
          alignItems: 'center',
        }}
      >
        {/* LEFT: Hero */}
        <section>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.2rem 0.75rem',
              borderRadius: 999,
              backgroundColor: 'rgba(15,23,42,0.85)',
              border: '1px solid rgba(148,163,184,0.4)',
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: 'radial-gradient(circle, #22c55e, #16a34a)',
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: '#e5e7eb',
              }}
            >
              Free to join · Real people · Intentional dating
            </span>
          </div>

          <h1
            style={{
              fontSize: 40,
              lineHeight: 1.1,
              marginBottom: 16,
              color: 'white',
            }}
          >
            Dating that actually
            <span style={{ color: '#f97316' }}> respects</span> your time.
          </h1>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: '#d1d5db',
              maxWidth: 540,
              marginBottom: 24,
            }}
          >
            RomanticaHQ is built for people who are tired of games and want
            something intentional. No swiping addiction. No fake profiles.
            Just real people looking for real connection.
          </p>

          {/* Main CTA */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 16,
            }}
          >
            <a
              href="/auth/signup"
              style={{
                padding: '0.85rem 1.75rem',
                borderRadius: 999,
                background:
                  'linear-gradient(135deg, #f97316, #db2777, #6366f1)',
                color: 'white',
                fontWeight: 600,
                fontSize: 15,
                textDecoration: 'none',
                boxShadow: '0 20px 40px rgba(15,23,42,0.45)',
              }}
            >
              👉 Start free today
            </a>
            <a
              href="/auth/login"
              style={{
                padding: '0.85rem 1.4rem',
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.7)',
                color: '#e5e7eb',
                fontWeight: 500,
                fontSize: 14,
                textDecoration: 'none',
                backgroundColor: 'rgba(15,23,42,0.8)',
              }}
            >
              I already have an account
            </a>
          </div>

          <p
            style={{
              fontSize: 12,
              color: '#9ca3af',
              maxWidth: 480,
            }}
          >
            By continuing, you confirm that you are at least 18 years old and
            you agree to our Terms, Privacy Policy, and Safety Guidelines.
          </p>

          {/* Trust bullets */}
          <div
            style={{
              marginTop: 28,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 16,
              maxWidth: 560,
            }}
          >
            {[
              'Photo-first profiles',
              'Intentional matches',
              'Report & block tools',
            ].map((text) => (
              <div
                key={text}
                style={{
                  backgroundColor: 'rgba(15,23,42,0.85)',
                  borderRadius: 16,
                  border: '1px solid rgba(148,163,184,0.35)',
                  padding: '0.75rem 0.9rem',
                  fontSize: 12,
                  color: '#e5e7eb',
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT: Visual card */}
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 360,
              borderRadius: 28,
              padding: '1.5rem',
              background:
                'linear-gradient(145deg, rgba(30,64,175,0.9), rgba(236,72,153,0.85))',
              boxShadow: '0 30px 60px rgba(15,23,42,0.75)',
              color: 'white',
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: 'rgba(249,250,251,0.9)',
                marginBottom: 12,
              }}
            >
              “RomanticaHQ is where real people go when they’re done playing
              games. We focus on energy, intention, and emotional safety.”
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  backgroundColor: 'rgba(15,23,42,0.9)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                💗
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  RomanticaHQ Team
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(241,245,249,0.8)',
                  }}
                >
                  Built for serious connections, not time wasters.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
