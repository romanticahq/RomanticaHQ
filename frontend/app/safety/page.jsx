export const metadata = {
  title: "Safety Guidelines | RomanticaHQ",
};

export default function SafetyPage() {
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
          Safety Guidelines
        </h1>
        <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 24 }}>
          Last updated: {new Date().toLocaleDateString("en-GB")}
        </p>

        <p style={{ marginBottom: 16, lineHeight: 1.7 }}>
          RomanticaHQ is built for <strong>real people</strong> and{" "}
          <strong>respectful energy</strong>. These guidelines help keep
          everyone safe.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          1. Protect your personal info
        </h2>
        <ul style={{ marginLeft: 20, lineHeight: 1.7 }}>
          <li>Don&apos;t share your home address or financial details.</li>
          <li>Be careful before sending money or gifts to anyone.</li>
          <li>Move slowly when building trust with someone new.</li>
        </ul>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          2. Meeting in real life
        </h2>
        <ul style={{ marginLeft: 20, lineHeight: 1.7 }}>
          <li>Always meet in a public place for the first few times.</li>
          <li>Tell a friend or family member where you&apos;re going.</li>
          <li>Arrange your own transport so you can leave if needed.</li>
        </ul>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          3. Report bad behaviour
        </h2>
        <p style={{ marginBottom: 12, lineHeight: 1.7 }}>
          If someone is harassing you, being abusive, or trying to scam
          you, please report them and block them. As RomanticaHQ grows, we
          will add in-app tools to help with this.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          4. Our promise
        </h2>
        <p style={{ marginBottom: 12, lineHeight: 1.7 }}>
          We want RomanticaHQ to feel like a safe space for intentional
          dating. We do not tolerate hate, harassment, or violence on this
          platform.
        </p>

        <p
          style={{
            marginTop: 32,
            fontSize: 14,
            color: "#9ca3af",
            lineHeight: 1.7,
          }}
        >
          If you ever feel unsafe because of someone you met through
          RomanticaHQ, prioritise your safety first and seek help from
          trusted friends, family, or local authorities if necessary.
        </p>
      </div>
    </main>
  );
}
