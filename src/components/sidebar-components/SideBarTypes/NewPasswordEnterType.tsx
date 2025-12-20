import { InputField } from '../InputField';
import { LogInSideBarArrowButton } from '../../buttons/LogInSideBarArrowButton';
import { LOCK_ICON } from '../../../utils/icons';
import { useResetPassword } from '../../../hooks/auth-hooks/useResetPassword';

interface NewPasswordEnterTypeProps {
  email: string | null;
  onBack: () => void;
  onSuccess: () => void;
}

export function NewPasswordEnterType({
  email,
  onBack,
  onSuccess,
}: NewPasswordEnterTypeProps) {
  const { password, confirm, setConfirm, showError, Error, loading, submit } =
    useResetPassword({ email, onSuccess });

  function handleConfirmChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirm(e.target.value);
  }

  return (
    <section>
      <div className="flex justify-start mb-4 items-center mt-10">
        <LogInSideBarArrowButton onClose={onBack} />
        <h1 className="absolute left-1/2 -translate-x-1/2 sm:text-3xl text-xl text-[var(--color-second-white)] font-bold">
          Password Reset
        </h1>
      </div>

      <div className="text-center pt-2">
        <p className="text-[var(--color-gray-secondary)] mt-6 px-8">
          Set a new password for
          <br />
          <span className="font-bold">{email}</span>
        </p>
      </div>

      <div className="mt-12 space-y-6">
        <InputField
          placeHolder="New password"
          type="password"
          isPassword
          icon={LOCK_ICON}
          value={password}
          onChange={handleConfirmChange}
          isMatchingPasswords={!showError}
          name=""
        />

        <InputField
          placeHolder="Confirm new password"
          type="password"
          isPassword
          icon={LOCK_ICON}
          value={confirm}
          onChange={handleConfirmChange}
          isMatchingPasswords={!showError}
          name=""
        />

        {showError && (
          <p className="text-red-400 text-sm text-center">
            Passwords do not match
          </p>
        )}

        {Error && <p className="text-red-400 text-sm text-center">{Error}</p>}

        <button
          onClick={submit}
          disabled={loading}
          className="w-full h-12 rounded-lg bg-[var(--color-secondary)] text-white mt-6"
        >
          {loading ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </section>
  );
}
