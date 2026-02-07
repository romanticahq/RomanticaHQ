import Link from 'next/link';

export const metadata = {
  title: 'Modern dating without the chaos',
  description:
    'RomanticaHQ is a calm, intentional dating platform for real people and real connection.',
};

export default function HomePage() {
  return (
    <section className="landing">
      <div className="landing-inner">
        <p className="landing-kicker">Built for serious energy · Not for time wasters</p>
        <h1 className="landing-title">Get who gets you.</h1>
        <p className="landing-copy">
          RomanticaHQ is for people who are done with games. Real profiles, safer
          conversations, and intentional matches that feel calm and human.
        </p>

        <div className="landing-actions">
          <Link href="/auth/signup" className="button button-primary">
            Join for free
          </Link>
          <Link href="/auth/login" className="nav-link">
            Log in
          </Link>
        </div>

        <p className="landing-disclaimer">
          By joining, you confirm you are 18+ and agree to our Terms, Privacy
          Policy, and Safety Guidelines.
        </p>

        <h2 className="landing-question">Start free today</h2>
        <p className="landing-copy" style={{ marginBottom: 10 }}>
          Have you tried online dating before?
        </p>
        <div className="landing-links" aria-label="Onboarding shortcuts">
          <a href="#new">I&apos;m new to it</a>
          <a href="#once">Once or twice</a>
          <a href="#pro">I&apos;m an online dating pro</a>
        </div>
      </div>
    </section>
  );
}
