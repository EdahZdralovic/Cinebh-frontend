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
  const {
    password,
    confirm,
    setPassword,
    setConfirm,
    showError,
    apiError,
    loading,
    submit,
  } = useResetPassword({ email, onSuccess });

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
          onChange={(e) => setPassword(e.target.value)}
          isMatchingPasswords={!showError}
          name=""
        />

        <InputField
          placeHolder="Confirm new password"
          type="password"
          isPassword
          icon={LOCK_ICON}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          isMatchingPasswords={!showError}
          name=""
        />

        {showError && (
          <p className="text-red-400 text-sm text-center">
            Passwords do not match
          </p>
        )}

        {apiError && (
          <p className="text-red-400 text-sm text-center">{apiError}</p>
        )}

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
