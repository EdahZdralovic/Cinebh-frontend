interface SignInButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export function SignInButton({ onClick, disabled }: SignInButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        ' h-12 w-full bg-[var(--color-secondary)] rounded-lg text-white '
      }
    >
      Sign In
    </button>
  );
}
