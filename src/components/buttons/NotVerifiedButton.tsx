import { useState } from 'react';
import { resendVerification } from '../../services/authService.ts';

interface NotVerifiedButtonProps {
  email: string;
  onRegisterSuccess?: (email: string) => void;
}

export function NotVerifiedButton({
  email,
  onRegisterSuccess,
}: NotVerifiedButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    if (!email || !email.trim()) return;

    try {
      setLoading(true);
      // ovo je uvijek EMAIL_VERIFY case
      await resendVerification(email, true);
      onRegisterSuccess?.(email);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || !email.trim()}
      className={`underline text-md text-white ${
        loading || !email.trim() ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Sending...' : 'Resend verification email'}
    </button>
  );
}
