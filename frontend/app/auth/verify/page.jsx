export const metadata = {
  title: 'Verify your email | RomanticaHQ',
};

import VerifyClient from './verify-client';

export default function VerifyPage({ searchParams }) {
  const token = typeof searchParams?.token === 'string' ? searchParams.token : '';
  return (
    <main
      className="rhq-romance-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
      }}
    >
      <VerifyClient token={token} />
    </main>
  );
}
