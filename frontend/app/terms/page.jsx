export const metadata = {
  title: "Terms of Use | RomanticaHQ",
};

export default function TermsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "#e5e7eb",
        padding: "3rem 1.5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 800, width: "100%" }}>
        <h1
          style={{
            fontSize: 32,
            marginBottom: 16,
            color: "#f9fafb",
          }}
        >
          Terms of Use
        </h1>
        <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 24 }}>
          Last updated: {new Date().toLocaleDateString("en-GB")}
        </p>

        <p style={{ marginBottom: 16, lineHeight: 1.7 }}>
          Welcome to <strong>RomanticaHQ</strong>. By using this platform,
          you agree to these Terms of Use. If you do not agree, please do
          not use the website or create an account.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          1. Eligibility
        </h2>
        <p style={{ marginBottom: 12, lineHeight: 1.7 }}>
          You must be at least <strong>18 years old</strong> to use
          RomanticaHQ. By creating an account, you confirm that you meet
          this requirement.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          2. Your responsibilities
        </h2>
        <ul style={{ marginLeft: 20, lineHeight: 1.7 }}>
          <li>Provide accurate information about yourself.</li>
          <li>Use the platform respectfully and safely.</li>
          <li>Do not harass, abuse, or scam other users.</li>
          <li>Do not share illegal, hateful, or explicit content.</li>
        </ul>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          3. No guarantees
        </h2>
        <p style={{ marginBottom: 12, lineHeight: 1.7 }}>
          RomanticaHQ does not guarantee that you will find a match, a
          relationship, or any particular result from using the platform.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          4. Account suspension
        </h2>
        <p style={{ marginBottom: 12, lineHeight: 1.7 }}>
          We may suspend or remove accounts that violate these Terms,
          harm other users, or abuse the platform.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          5. Changes to these Terms
        </h2>
        <p style={{ marginBottom: 12, lineHeight: 1.7 }}>
          We may update these Terms from time to time. When we do, we
          will update the “Last updated” date above.
        </p>

        <p
          style={{
            marginTop: 32,
            fontSize: 14,
            color: "#9ca3af",
            lineHeight: 1.7,
          }}
        >
          This page is a simple terms summary and not formal legal advice.
          For a production launch, you should ask a lawyer to review your
          Terms and Privacy Policy.
        </p>
      </div>
    </main>
  );
}
