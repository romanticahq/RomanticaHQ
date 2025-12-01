export const metadata = {
  title: "Privacy Policy | RomanticaHQ",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 24 }}>
          Last updated: {new Date().toLocaleDateString("en-GB")}
        </p>

        <p style={{ marginBottom: 16, lineHeight: 1.7 }}>
          Your privacy matters to <strong>RomanticaHQ</strong>. This
          page explains what information we collect and how we use it.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          1. Information we collect
        </h2>
        <ul style={{ marginLeft: 20, lineHeight: 1.7 }}>
          <li>Basic account details (name, email, password).</li>
          <li>Profile details you choose to share (bio, location, etc.).</li>
          <li>Technical data like IP address and device/browser info.</li>
        </ul>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          2. How we use your data
        </h2>
        <ul style={{ marginLeft: 20, lineHeight: 1.7 }}>
          <li>To create and manage your account.</li>
          <li>To help you connect with other users.</li>
          <li>To improve the platform and protect users from abuse.</li>
        </ul>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          3. Sharing your data
        </h2>
        <p style={{ marginBottom: 12, lineHeight: 1.7 }}>
          We do not sell your personal data. We may use trusted service
          providers (for example, email or analytics) who help us operate
          the platform.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          4. Data security
        </h2>
        <p style={{ marginBottom: 12, lineHeight: 1.7 }}>
          We take reasonable steps to protect your information, but no
          system is 100% secure. You are responsible for keeping your
          password safe.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>
          5. Your choices
        </h2>
        <ul style={{ marginLeft: 20, lineHeight: 1.7 }}>
          <li>Update your details in your profile (when live).</li>
          <li>Delete your account by contacting support (coming soon).</li>
        </ul>

        <p
          style={{
            marginTop: 32,
            fontSize: 14,
            color: "#9ca3af",
            lineHeight: 1.7,
          }}
        >
          This Privacy Policy is a simple, human-readable version. For a
          full legal policy, you should work with a qualified lawyer when
          RomanticaHQ is ready for a wider public launch.
        </p>
      </div>
    </main>
  );
}
