// frontend/app/auth/verify/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("Verifying your email…");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Missing verification token. Please use the link we sent you.");
      return;
    }

    const verify = async () => {
      try {
        setStatus("loading");
        setMessage("Verifying your email…");

        const res = await fetch(
          `${API_BASE}/api/auth/verify?token=${encodeURIComponent(token)}`,
          {
            method: "GET",
          }
        );

        if (res.ok) {
          const text = await res.text();
          setStatus("success");
          setMessage(
            text || "Your email is verified. You can now log in to RomanticaHQ."
          );
        } else {
          const text = await res.text();
          setStatus("error");
          setMessage(text || "We couldn’t verify this link. It may be expired.");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Something went wrong while verifying. Please try again.");
      }
    };

    verify();
  }, [searchParams]);

  const goToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(251,113,133,0.16), transparent 55%), radial-gradient(circle at bottom, rgba(129,140,248,0.16), transparent 55%), #020617",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        color: "white",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          borderRadius: 24,
          padding: "1.75rem 1.5rem",
          background:
            "linear-gradient(145deg, rgba(30,64,175,0.9), rgba(236,72,153,0.85))",
          boxShadow: "0 30px 60px rgba(15,23,42,0.75)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              backgroundColor: "rgba(15,23,42,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            {status === "success" ? "✅" : status === "error" ? "⚠️" : "📩"}
          </div>
          <h1 style={{ fontSize: 20, margin: 0 }}>Verify your email</h1>
        </div>

        <p
          style={{
            marginTop: 16,
            fontSize: 14,
            lineHeight: 1.6,
            color: "rgba(249,250,251,0.9)",
          }}
        >
          {message}
        </p>

        {status === "success" && (
          <button
            onClick={goToLogin}
            style={{
              marginTop: 20,
              width: "100%",
              padding: "0.8rem 1rem",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background:
                "linear-gradient(135deg, #f97316, #db2777, #6366f1)",
              color: "white",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Go to login
          </button>
        )}
      </div>
    </div>
  );
}