// frontend/app/page.tsx

export default function HomePage() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          backgroundColor: "#0b1120",
          color: "#020617",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Navbar */}
          <header
            style={{
              width: "100%",
              padding: "1rem 1.5rem",
              position: "sticky",
              top: 0,
              zIndex: 20,
              backdropFilter: "blur(12px)",
              background:
                "linear-gradient(to right, rgba(15,23,42,0.9), rgba(24,24,27,0.9))",
              borderBottom: "1px solid rgba(148,163,184,0.25)",
            }}
          >
            <div
              style={{
                maxWidth: 1040,
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <a
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background:
                      "radial-gradient(circle at 30% 0, #f97316, #db2777)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  R
                </div>
                <span
                  style={{
                    color: "white",
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                >
                  RomanticaHQ
                </span>
              </a>

              <nav
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <a
                  href="/auth/login"
                  style={{
                    color: "#e5e7eb",
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  Log in
                </a>
                <a
                  href="/auth/signup"
                  style={{
                    padding: "0.45rem 0.95rem",
                    borderRadius: 999,
                    background:
                      "linear-gradient(135deg, #f97316, #db2777, #6366f1)",
                    color: "white",
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Join for free
                </a>
              </nav>
            </div>
          </header>

          {/* Main hero */}
          <main style={{ flex: 1 }}>
            <div
              style={{
                minHeight: "calc(100vh - 64px)",
                background:
                  "radial-gradient(circle at top, rgba(251,113,133,0.16), transparent 55%), radial-gradient(circle at bottom, rgba(129,140,248,0.16), transparent 55%), #020617",
                display: "flex",
                justifyContent: "center",
                padding: "3rem 1.5rem",
              }}
            >
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
                {/* Left: text */}
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
                        background:
                          "radial-gradient(circle, #22c55e, #16a34a)",
                      }}
                    />
                    <span
                      style={{ fontSize: 12, color: "#e5e7eb" }}
                    >
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
                    <span style={{ color: "#f97316" }}>soft, safe,</span>{" "}
                    and real.
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
                    RomanticaHQ is for people who are done with games.
                    No swiping addiction. No fake flexing. Just real
                    humans who want intentional connection and calm,
                    grown energy.
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
                    By joining, you confirm you&apos;re 18+ and you agree
                    to our future Terms, Privacy Policy, and Safety
                    Guidelines.
                  </p>

                  <div
                    style={{
                      marginTop: 28,
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(3, minmax(0, 1fr))",
                      gap: 16,
                      maxWidth: 560,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "rgba(15,23,42,0.85)",
                        borderRadius: 16,
                        border:
                          "1px solid rgba(148,163,184,0.35)",
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
                        border:
                          "1px solid rgba(148,163,184,0.35)",
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
                        border:
                          "1px solid rgba(148,163,184,0.35)",
                        padding: "0.75rem 0.9rem",
                        fontSize: 12,
                        color: "#e5e7eb",
                      }}
                    >
                      Report &amp; block tools
                    </div>
                  </div>
                </section>

                {/* Right: quote card */}
                <section
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 360,
                      borderRadius: 28,
                      padding: "1.5rem",
                      background:
                        "linear-gradient(145deg, rgba(30,64,175,0.9), rgba(236,72,153,0.85))",
                      boxShadow:
                        "0 30px 60px rgba(15,23,42,0.75)",
                      color: "white",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        color: "rgba(249,250,251,0.9)",
                        marginBottom: 12,
                      }}
                    >
                      “RomanticaHQ is for people who like love soft but
                      serious. Less noise, more intention, more people
                      who actually know what they want.”
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 999,
                          backgroundColor: "rgba(15,23,42,0.9)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
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
                            color: "rgba(241,245,249,0.8)",
                          }}
                        >
                          Built for serious connections, not time
                          wasters.
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer
            style={{
              borderTop: "1px solid rgba(148,163,184,0.25)",
              backgroundColor: "#020617",
              padding: "1rem 1.5rem",
              color: "#9ca3af",
            }}
          >
            <div
              style={{
                maxWidth: 1040,
                margin: "0 auto",
                display: "flex",
                flexWrap: "wrap",
                rowGap: 8,
                columnGap: 16,
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 12,
              }}
            >
              <span>© 2025 RomanticaHQ. All rights reserved.</span>
              <div style={{ display: "flex", gap: 12 }}>
                <a
                  href="#"
                  style={{
                    color: "#e5e7eb",
                    textDecoration: "none",
                  }}
                >
                  Terms
                </a>
                <a
                  href="#"
                  style={{
                    color: "#e5e7eb",
                    textDecoration: "none",
                  }}
                >
                  Privacy
                </a>
                <a
                  href="#"
                  style={{
                    color: "#e5e7eb",
                    textDecoration: "none",
                  }}
                >
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
