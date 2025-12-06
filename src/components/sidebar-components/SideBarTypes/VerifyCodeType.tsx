import { LogInSideBarArrowButton } from '../../buttons/LogInSideBarArrowButton.tsx';

interface VerifyCodeTypeProps {
  isForResetPassword?: boolean;
  onBack: () => void;
}

export function VerifyCodeType({
  isForResetPassword = false,
  onBack,
}: VerifyCodeTypeProps) {
  return (
    <section>
      <div className={'flex justify-start mb-4 items-center mt-10 '}>
        <LogInSideBarArrowButton onClose={onBack} />
        <h1
          className={
            ' absolute left-1/2 -translate-x-1/2  text-3xl text-[var(--color-second-white)] font-bold '
          }
        >
          Password Reset
        </h1>
      </div>
    </section>
  );
}
