export const metadata = {
  title: 'Privacy Policy',
  description: 'Read how RomanticaHQ collects and protects your data.',
};

export default function PrivacyPage() {
  return (
    <section className="legal-page">
      <div className="legal-page-inner">
        <h1>Privacy Policy</h1>
        <p className="legal-meta">
          Last updated: {new Date().toLocaleDateString('en-GB')}
        </p>

        <p style={{ marginBottom: 16 }}>
          Your privacy matters to <strong>RomanticaHQ</strong>. This page explains
          what information we collect and how we use it.
        </p>

        <h2>1. Information we collect</h2>
        <ul>
          <li>Basic account details (name, email, password).</li>
          <li>Profile details you choose to share (bio, location, etc.).</li>
          <li>Technical data like IP address and device/browser info.</li>
        </ul>

        <h2>2. How we use your data</h2>
        <ul>
          <li>To create and manage your account.</li>
          <li>To help you connect with other users.</li>
          <li>To improve the platform and protect users from abuse.</li>
        </ul>

        <h2>3. Sharing your data</h2>
        <p>
          We do not sell your personal data. We may use trusted service providers
          (for example, email or analytics) who help us operate the platform.
        </p>

        <h2>4. Data security</h2>
        <p>
          We take reasonable steps to protect your information, but no system is
          100% secure. You are responsible for keeping your password safe.
        </p>

        <h2>5. Your choices</h2>
        <ul>
          <li>Update your details in your profile (when live).</li>
          <li>Delete your account by contacting support (coming soon).</li>
        </ul>

        <p style={{ marginTop: 32, fontSize: 14, color: '#9ca3af' }}>
          This Privacy Policy is a simple, human-readable version. For a full
          legal policy, you should work with a qualified lawyer when RomanticaHQ
          is ready for a wider public launch.
        </p>
      </div>
    </section>
  );
}
