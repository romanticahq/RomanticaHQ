export const metadata = {
  title: 'Safety Guidelines',
  description: 'Safety tips and reporting guidance for RomanticaHQ members.',
};

export default function SafetyPage() {
  return (
    <section className="legal-page">
      <div className="legal-page-inner">
        <h1>Safety Guidelines</h1>
        <p className="legal-meta">
          Last updated: {new Date().toLocaleDateString('en-GB')}
        </p>

        <p style={{ marginBottom: 16 }}>
          RomanticaHQ is built for <strong>real people</strong> and{' '}
          <strong>respectful energy</strong>. These guidelines help keep everyone
          safe.
        </p>

        <h2>1. Protect your personal info</h2>
        <ul>
          <li>Don&apos;t share your home address or financial details.</li>
          <li>Be careful before sending money or gifts to anyone.</li>
          <li>Move slowly when building trust with someone new.</li>
        </ul>

        <h2>2. Meeting in real life</h2>
        <ul>
          <li>Always meet in a public place for the first few times.</li>
          <li>Tell a friend or family member where you&apos;re going.</li>
          <li>Arrange your own transport so you can leave if needed.</li>
        </ul>

        <h2>3. Report bad behaviour</h2>
        <p>
          If someone is harassing you, being abusive, or trying to scam you,
          please report them and block them. As RomanticaHQ grows, we will add
          in-app tools to help with this.
        </p>

        <h2>4. Our promise</h2>
        <p>
          We want RomanticaHQ to feel like a safe space for intentional dating.
          We do not tolerate hate, harassment, or violence on this platform.
        </p>

        <p style={{ marginTop: 32, fontSize: 14, color: '#9ca3af' }}>
          If you ever feel unsafe because of someone you met through RomanticaHQ,
          prioritise your safety first and seek help from trusted friends,
          family, or local authorities if necessary.
        </p>
      </div>
    </section>
  );
}
