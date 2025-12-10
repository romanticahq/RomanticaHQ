export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(251,113,133,0.16), transparent 55%), radial-gradient(circle at bottom, rgba(129,140,248,0.16), transparent 55%), #020617",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 1.5rem 4rem",
      }}
    >
      {/* HERO + CTA ROW */}
      <div
        style={{
          maxWidth: 1040,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)",
          gap: 32,
          alignItems: "center",
        }}
      >
        {/* LEFT SIDE – HERO */}
        <section>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.2rem 0.75rem",
              borderRadius: 999,
              backgroundColor: "rgba(15,23,42,0.85)",
              border: "1px solid rgba(148,163,184,0.4)",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "radial-gradient(circle, #22c55e, #16a34a)",
              }}
            />
            <span style={{ fontSize: 12, color: "#e5e7eb" }}>
              Built for serious energy · Not for time wasters
            </span>
          </div>

          <h1
            style={{
              fontSize: 40,
              lineHeight: 1.1,
              marginBottom: 16,
              color: "white",
            }}
          >
            Dating that feels{" "}
            <span style={{ color: "#f97316" }}>soft, safe,</span> and real.
          </h1>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: "#d1d5db",
              maxWidth: 540,
              marginBottom: 24,
            }}
          >
            RomanticaHQ is for people who are done with games. No swiping
            addiction. No fake flexing. Just real humans who want intentional
            connection and calm, grown energy.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <a
              href="/auth/signup"
              style={{
                padding: "0.85rem 1.75rem",
                borderRadius: 999,
                background:
                  "linear-gradient(135deg, #f97316, #db2777, #6366f1)",
                color: "white",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                boxShadow: "0 20px 40px rgba(15,23,42,0.45)",
              }}
            >
              💗 Start meeting real people today
            </a>
            <a
              href="/auth/login"
              style={{
                padding: "0.85rem 1.4rem",
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.7)",
                color: "#e5e7eb",
                fontWeight: 500,
                fontSize: 14,
                textDecoration: "none",
                backgroundColor: "rgba(15,23,42,0.8)",
              }}
            >
              I already have an account
            </a>
          </div>

          <p
            style={{
              fontSize: 12,
              color: "#9ca3af",
              maxWidth: 480,
            }}
          >
            By joining, you confirm you&apos;re 18+ and you agree to our Terms,
            Privacy Policy, and Safety Guidelines.
          </p>

          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 16,
              maxWidth: 560,
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(15,23,42,0.85)",
                borderRadius: 16,
                border: "1px solid rgba(148,163,184,0.35)",
                padding: "0.75rem 0.9rem",
                fontSize: 12,
                color: "#e5e7eb",
              }}
            >
              Photo-first profiles
            </div>
            <div
              style={{
                backgroundColor: "rgba(15,23,42,0.85)",
                borderRadius: 16,
                border: "1px solid rgba(148,163,184,0.35)",
                padding: "0.75rem 0.9rem",
                fontSize: 12,
                color: "#e5e7eb",
              }}
            >
              Intentional matches
            </div>
            <div
              style={{
                backgroundColor: "rgba(15,23,42,0.85)",
                borderRadius: 16,
                border: "1px solid rgba(148,163,184,0.35)",
                padding: "0.75rem 0.9rem",
                fontSize: 12,
                color: "#e5e7eb",
              }}
            >
              Report &amp; block tools
            </div>
          </div>
        </section>

        {/* RIGHT SIDE – CTA CARD WITH LENKA & JOHN */}
        <section style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 420,
              height: 520,
              borderRadius: 24,
              padding: "1.8rem 1.9rem",
              background:
                "radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 55%), radial-gradient(circle at bottom right, rgba(168,85,247,0.18), transparent 55%), rgba(15,23,42,0.96)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            {/* quote */}
            <div>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  maxWidth: 260,
                  opacity: 0.96,
                  marginBottom: 10,
                }}
              >
                “Two real people. No games. Just soft, intentional energy.”
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                }}
              >
                RomanticaHQ pairs people who are actually ready for calm, grown
                connection.
              </p>
            </div>

            {/* badges */}
            <div
              style={{
                marginTop: 28,
                marginBottom: 28,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 12,
              }}
            >
              <div
                style={{
                  padding: "0.5rem 0.75rem",
                  borderRadius: 999,
                  backgroundColor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(148,163,184,0.5)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  alignSelf: "flex-start",
                }}
              >
                <span>✨</span>
                <span>Soft, calm, grown energy.</span>
              </div>
              <div
                style={{
                  padding: "0.5rem 0.75rem",
                  borderRadius: 999,
                  backgroundColor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(148,163,184,0.5)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  alignSelf: "flex-start",
                }}
              >
                <span>🎯</span>
                <span>Matches based on values, not vibes.</span>
              </div>
            </div>

            {/* AVATARS – LENKA & JOHN */}
            <div
              style={{
                marginBottom: 18,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Lenka */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 30% 20%, #38bdf8, #0f172a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 600,
                    border: "2px solid rgba(248,250,252,0.9)",
                    flexShrink: 0,
                  }}
                >
                  L
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Lenka, 26</div>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>
                    “Looking for soft, grown energy.”
                  </div>
                </div>
              </div>

              {/* John */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 30% 20%, #a855f7, #0f172a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 600,
                    border: "2px solid rgba(248,250,252,0.9)",
                    flexShrink: 0,
                  }}
                >
                  J
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>John, 28</div>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>
                    “Ready for intentional, serious connection.”
                  </div>
                </div>
              </div>
            </div>

            {/* bottom line */}
            <div
              style={{
                fontSize: 12,
                opacity: 0.9,
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#e2e8f0",
              }}
            >
              <span>💬</span>
              <span>RomanticaHQ matched them based on shared values.</span>
            </div>
          </div>
        </section>
      </div>

      {/* HOW ROMANTICAHQ WORKS */}
      <section
        style={{
          marginTop: "3.5rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1040,
            width: "100%",
          }}
        >
          <h2
            style={{
              fontSize: 20,
              color: "#e5e7eb",
              marginBottom: 18,
            }}
          >
            How RomanticaHQ works
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 20,
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                padding: "1.25rem 1.2rem",
                borderRadius: 16,
                backgroundColor: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(148,163,184,0.4)",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  marginBottom: 8,
                }}
              >
                Step 1
              </div>
              <h3
                style={{
                  fontSize: 16,
                  color: "#f9fafb",
                  marginBottom: 6,
                }}
              >
                Create your soft, honest profile
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "#d1d5db",
                  lineHeight: 1.6,
                }}
              >
                Add real photos, a calm bio, and what you&apos;re genuinely
                looking for. No flexing, no chaos energy.
              </p>
            </div>

            {/* Step 2 */}
            <div
              style={{
                padding: "1.25rem 1.2rem",
                borderRadius: 16,
                backgroundColor: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(148,163,184,0.4)",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  marginBottom: 8,
                }}
              >
                Step 2
              </div>
              <h3
                style={{
                  fontSize: 16,
                  color: "#f9fafb",
                  marginBottom: 6,
                }}
              >
                Set your intention &amp; boundaries
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "#d1d5db",
                  lineHeight: 1.6,
                }}
              >
                Choose whether you want soft and slow, serious dating, or
                you&apos;re just exploring with respect and clarity.
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                padding: "1.25rem 1.2rem",
                borderRadius: 16,
                backgroundColor: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(148,163,184,0.4)",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  marginBottom: 8,
                }}
              >
                Step 3
              </div>
              <h3
                style={{
                  fontSize: 16,
                  color: "#f9fafb",
                  marginBottom: 6,
                }}
              >
                Get intentional matches, not random swipes
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "#d1d5db",
                  lineHeight: 1.6,
                }}
              >
                We focus on shared values, not just looks. Fewer but better
                matches, for people who actually know what they want.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
