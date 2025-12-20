import { useMutation } from '@tanstack/react-query';
import { resendVerification } from '../../services/authService';
import { toast } from 'sonner';

export function useResendVerification() {
  return useMutation({
    mutationFn: (email: string) => resendVerification(email, true),
    onSuccess: () => {
      toast.success('Verification email sent');
    },

    onError: (err: any) => {
      const message =
        err?.response?.data?.message ?? 'Failed to send verification email';

      toast.error(message);
    },
  });
}
