export default function HomePage() {
  return (
    <main
      className="rhq-fullscreen rhq-main-pad rhq-romance-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 1.5rem 4rem",
      }}
    >
      {/* HERO + CTA ROW */}
      <div
        className="rhq-hero-grid"
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
        <section className="rhq-stagger">
          <div className="rhq-eyebrow rhq-reveal" style={{ "--i": 0 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "radial-gradient(circle, #22c55e, #16a34a)",
              }}
            />
            <span>Built for serious energy. Not for time wasters.</span>
          </div>

          <h1
            className="rhq-h1 rhq-reveal"
            style={{ "--i": 1 }}
          >
            Dating that feels{" "}
            <span style={{ color: "#f97316" }}>soft, safe,</span> and real.
          </h1>

          <p
            className="rhq-lede rhq-reveal"
            style={{ "--i": 2 }}
          >
            RomanticaHQ is for people who are done with games. No swiping
            addiction. No fake flexing. Just real humans who want intentional
            connection and calm, grown energy.
          </p>

          <div
            className="rhq-reveal"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 16,
              "--i": 3,
            }}
          >
            <a href="/auth/signup" className="rhq-btn-primary">
              Start meeting real people
            </a>
            <a href="/auth/login" className="rhq-btn-secondary">
              I already have an account
            </a>
          </div>

          <p
            className="rhq-reveal"
            style={{ fontSize: 12, color: "#9ca3af", maxWidth: 480, "--i": 4 }}
          >
            By joining, you confirm you&apos;re 18+ and you agree to our Terms,
            Privacy Policy, and Safety Guidelines.
          </p>

          <div
            className="rhq-reveal"
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 16,
              maxWidth: 560,
              "--i": 5,
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
            className="rhq-card-fixed"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 420,
              height: 520,
              borderRadius: 24,
              padding: "1.8rem 1.9rem",
              backgroundColor: "rgba(15,23,42,0.96)",
              backgroundImage:
                "radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 55%), radial-gradient(circle at bottom right, rgba(168,85,247,0.18), transparent 55%), url('/romance-cta.svg')",
              backgroundRepeat: "no-repeat, no-repeat, no-repeat",
              backgroundPosition: "top left, bottom right, center 110%",
              backgroundSize: "auto, auto, 740px auto",
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
                “Two real people. No games. Just calm, intentional energy.”
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
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "#fca5a5" }} />
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
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "#a5b4fc" }} />
                <span>Matches based on values, not vibes.</span>
              </div>
            </div>

            {/* ROMANTIC CTA (no "avatar" circles) */}
            <div
              style={{
                marginBottom: 18,
                padding: "0.95rem 1rem",
                borderRadius: 18,
                border: "1px solid rgba(148,163,184,0.35)",
                backgroundColor: "rgba(2,6,23,0.35)",
                backdropFilter: "blur(6px)",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 650, marginBottom: 6 }}>
                Your next chapter can start here.
              </div>
              <div style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.5 }}>
                Build a real profile, match intentionally, and talk with people
                who are actually ready.
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href="/auth/signup" className="rhq-btn-primary" style={{ padding: "0.7rem 1.1rem", fontSize: 13 }}>
                  Create your profile
                </a>
                <a href="/terms" className="rhq-btn-secondary" style={{ padding: "0.7rem 1.1rem", fontSize: 13 }}>
                  See how it works
                </a>
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
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#34d399" }} />
              <span>RomanticaHQ helps you match based on shared values.</span>
            </div>
          </div>
        </section>
      </div>

      {/* HOW ROMANTICAHQ WORKS */}
      <section className="rhq-section">
        <div className="rhq-container">
          <h2 className="rhq-h2 rhq-reveal" style={{ "--rhq-delay": "120ms" }}>
            How RomanticaHQ works
          </h2>

          <div
            className="rhq-grid rhq-grid-3 rhq-reveal"
            style={{
              gap: 20,
              "--rhq-delay": "200ms",
            }}
          >
            {/* Step 1 */}
            <div className="rhq-card rhq-card-pad">
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
            <div className="rhq-card rhq-card-pad">
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
            <div className="rhq-card rhq-card-pad">
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

      {/* PRODUCT SECTIONS */}
      <section className="rhq-section">
        <div className="rhq-container">
          <h2 className="rhq-h2 rhq-reveal" style={{ "--rhq-delay": "120ms" }}>
            Built for profiles, matching, chat, and AI guidance
          </h2>
          <p className="rhq-lede rhq-reveal" style={{ "--rhq-delay": "180ms" }}>
            We are building a complete experience: a real profile, intentional matching,
            safe messaging, and optional AI support that helps you communicate better.
          </p>

          <div className="rhq-grid rhq-grid-4 rhq-reveal" style={{ "--rhq-delay": "260ms" }}>
            <div className="rhq-card rhq-card-pad">
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Profiles</div>
              <div style={{ fontSize: 16, color: "#f8fafc", fontWeight: 650, marginBottom: 6 }}>
                Photo-forward, honest bios
              </div>
              <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.6 }}>
                Build a profile that shows who you are, what you want, and what you will not tolerate.
              </div>
            </div>

            <div className="rhq-card rhq-card-pad">
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Matching</div>
              <div style={{ fontSize: 16, color: "#f8fafc", fontWeight: 650, marginBottom: 6 }}>
                Values-first recommendations
              </div>
              <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.6 }}>
                Less chaos, fewer bad fits. The goal is quality matches you actually want to talk to.
              </div>
            </div>

            <div className="rhq-card rhq-card-pad">
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Chat</div>
              <div style={{ fontSize: 16, color: "#f8fafc", fontWeight: 650, marginBottom: 6 }}>
                Safer conversations
              </div>
              <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.6 }}>
                Built-in controls: block, report, and clear boundaries. Calm design encourages respect.
              </div>
            </div>

            <div className="rhq-card rhq-card-pad">
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>AI Matching</div>
              <div style={{ fontSize: 16, color: "#f8fafc", fontWeight: 650, marginBottom: 6 }}>
                Optional guidance, not manipulation
              </div>
              <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.6 }}>
                AI can help with prompts, first messages, and clarity. You stay in control.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="rhq-section">
        <div
          className="rhq-container rhq-card rhq-reveal"
          style={{
            "--rhq-delay": "120ms",
            padding: "1.5rem 1.4rem",
            backgroundImage:
              "radial-gradient(circle at top left, rgba(251,113,133,0.18), transparent 55%), radial-gradient(circle at bottom right, rgba(129,140,248,0.18), transparent 55%), url('/romance-cta.svg')",
            backgroundRepeat: "no-repeat, no-repeat, no-repeat",
            backgroundPosition: "top left, bottom right, right -220px center",
            backgroundSize: "auto, auto, 880px auto",
          }}
        >
          <div className="rhq-cta-grid">
            <div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6 }}>Join for free</div>
              <div style={{ fontFamily: "var(--rhq-font-serif)", fontSize: 22, color: "#f8fafc", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 8 }}>
                Start with a real profile. Let matching do the work.
              </div>
              <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.6, maxWidth: 60 * 8 }}>
                We are building RomanticaHQ as a serious platform. Calm UI, intentional matches, safer chat.
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
              <a href="/auth/signup" className="rhq-btn-primary">
                Create account
              </a>
              <a href="/auth/login" className="rhq-btn-secondary">
                Log in
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
