export const metadata = {
  title: 'Terms of Use',
  description: 'Review the terms and conditions for using RomanticaHQ.',
};

export default function TermsPage() {
  return (
    <section className="legal-page">
      <div className="legal-page-inner">
        <h1>Terms of Use</h1>
        <p className="legal-meta">
          Last updated: {new Date().toLocaleDateString('en-GB')}
        </p>

        <p style={{ marginBottom: 16 }}>
          Welcome to <strong>RomanticaHQ</strong>. By using this platform, you
          agree to these Terms of Use. If you do not agree, please do not use the
          website or create an account.
        </p>

        <h2>1. Eligibility</h2>
        <p>
          You must be at least <strong>18 years old</strong> to use RomanticaHQ.
          By creating an account, you confirm that you meet this requirement.
        </p>

        <h2>2. Your responsibilities</h2>
        <ul>
          <li>Provide accurate information about yourself.</li>
          <li>Use the platform respectfully and safely.</li>
          <li>Do not harass, abuse, or scam other users.</li>
          <li>Do not share illegal, hateful, or explicit content.</li>
        </ul>

        <h2>3. No guarantees</h2>
        <p>
          RomanticaHQ does not guarantee that you will find a match, a
          relationship, or any particular result from using the platform.
        </p>

        <h2>4. Account suspension</h2>
        <p>
          We may suspend or remove accounts that violate these Terms, harm other
          users, or abuse the platform.
        </p>

        <h2>5. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. When we do, we will update
          the “Last updated” date above.
        </p>

        <p style={{ marginTop: 32, fontSize: 14, color: '#9ca3af' }}>
          This page is a simple terms summary and not formal legal advice. For a
          production launch, you should ask a lawyer to review your Terms and
          Privacy Policy.
        </p>
      </div>
    </section>
  );
}
