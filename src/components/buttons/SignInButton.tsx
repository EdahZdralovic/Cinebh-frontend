import { RiLoader2Fill } from 'react-icons/ri';

interface SignInButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  text?: string;
  whiteBackground?: boolean;
}

export function SignInButton({
  onClick,
  disabled,
  isLoading,
  text = 'Continue',
  whiteBackground = false,
}: SignInButtonProps) {
  return (
    <button
      onClick={!isLoading ? onClick : undefined}
      disabled={disabled || isLoading}
      className={
        (whiteBackground
          ? ' text-[var(--color-secondary)] bg-white border border-[var(--color-secondary)] '
          : ' text-white bg-[var(--color-secondary)] ') +
        'h-12 w-full rounded-lg  ' +
        (disabled
          ? ' bg-gray-300 font-bold border-gray-300 text-gray-200 '
          : ' ')
      }
    >
      {isLoading ? (
        <div className={'flex justify-center'}>
          <RiLoader2Fill className={'mr-3 animate-spin size-5'} />
          Loading...
        </div>
      ) : (
        text
      )}
    </button>
  );
}
