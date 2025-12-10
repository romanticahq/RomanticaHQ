export const metadata = {
  title: 'Verify your email | RomanticaHQ',
};

export default function VerifyPage() {
  const background =
    'radial-gradient(circle at top, rgba(251,113,133,0.18), transparent 55%), radial-gradient(circle at bottom, rgba(129,140,248,0.16), transparent 55%), #020617';

  return (
    <main
      style={{
        minHeight: '100vh',
        background,
        display: 'flex',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: '100%',
          backgroundColor: 'rgba(15,23,42,0.95)',
          borderRadius: 24,
          border: '1px solid rgba(148,163,184,0.35)',
          padding: '2rem',
          boxShadow: '0 24px 60px rgba(15,23,42,0.8)',
        }}
      >
        <h1
          style={{
            fontSize: 24,
            marginBottom: 8,
            color: '#f9fafb',
          }}
        >
          Verify your email
        </h1>

        <p
          style={{
            fontSize: 14,
            color: '#9ca3af',
            marginBottom: 16,
          }}
        >
          Email verification is coming soon. For now, you can still explore
          RomanticaHQ while we finish this part of the experience.
        </p>

        <p
          style={{
            fontSize: 14,
            color: '#e5e7eb',
            marginBottom: 24,
            lineHeight: 1.6,
          }}
        >
          When verification is live, this page will confirm your email and let
          you continue into your account instantly.
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            fontSize: 14,
          }}
        >
          <a
            href="/auth/login"
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0.75rem 1.5rem',
              borderRadius: 999,
              background:
                'linear-gradient(135deg, #f97316, #db2777, #6366f1)',
              color: 'white',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Go to login
          </a>
          <a
            href="/auth/signup"
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0.7rem 1.5rem',
              borderRadius: 999,
              border: '1px solid rgba(148,163,184,0.7)',
              color: '#e5e7eb',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Create a new account
          </a>
        </div>

        <p
          style={{
            marginTop: 20,
            fontSize: 12,
            color: '#6b7280',
            lineHeight: 1.6,
          }}
        >
          If you landed here from a link in your email, don&apos;t worry. When
          verification is live, this will work automatically.
        </p>
      </div>
    </main>
  );
}
