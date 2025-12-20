import { useResendVerification } from '../../hooks/auth-hooks/useResendVerification.ts';

interface NotVerifiedButtonProps {
  email: string;
  onRegisterSuccess?: (email: string) => void;
}

export function NotVerifiedButton({
  email,
  onRegisterSuccess,
}: NotVerifiedButtonProps) {
  const { mutate, isPending } = useResendVerification();

  const handleClick = () => {
    if (!email || !email.trim()) return;

    mutate(email, {
      onSuccess: () => {
        onRegisterSuccess?.(email);
      },
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending || !email.trim()}
      className={`underline text-md text-white ${
        isPending || !email.trim() ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isPending ? 'Sending...' : 'Resend verification email'}
    </button>
  );
}
