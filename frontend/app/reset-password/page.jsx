import ResetPasswordClient from './reset-password-client';

export const metadata = {
  title: 'Reset password | RomanticaHQ',
};

export default function ResetPasswordPage({ searchParams }) {
  const token = typeof searchParams?.token === 'string' ? searchParams.token : '';
  return <ResetPasswordClient token={token} />;
}

