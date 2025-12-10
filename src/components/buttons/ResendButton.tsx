import { useState } from 'react';

interface ResendButtonProps {
  email: string;
  onResend: () => Promise<void>;
}

export function ResendButton({ email, onResend }: ResendButtonProps) {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    if (loading) return;
    if (!email || email.trim().length === 0) {
      throw new Error('Email missing');
    }
    try {
      setLoading(true);
      await onResend();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch {
      setLoading(false);
      throw new Error('Failed to resend');
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleClick}
      className={`underline text-white ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Sending...' : 'Resend email'}
    </button>
  );
}
