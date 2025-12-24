import { RiLoader2Fill } from 'react-icons/ri';

interface SignInButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  text?: string;
}

export function SignInButton({
  onClick,
  disabled,
  isLoading,
  text = 'Continue',
}: SignInButtonProps) {
  return (
    <button
      onClick={!isLoading ? onClick : undefined}
      disabled={disabled || isLoading}
      className={
        'h-12 w-full rounded-lg text-white bg-[var(--color-secondary)]'
      }
    >
      {isLoading ? (
        <div className={'flex justify-center'}>
          <RiLoader2Fill className={'mr-3 animate-spin size-5'} />
          Loading...
        </div>
      ) : (
        <>{text}</>
      )}
    </button>
  );
}
