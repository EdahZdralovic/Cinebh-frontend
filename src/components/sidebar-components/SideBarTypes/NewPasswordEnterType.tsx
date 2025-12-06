import { useState } from 'react';
import { InputField } from '../InputField';
import { GoLock } from 'react-icons/go';
import { LogInSideBarArrowButton } from '../../buttons/LogInSideBarArrowButton';

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

export function NewPasswordEnterType({ onBack, onSuccess }: Props) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const showError =
    hasSubmitted &&
    password.length > 0 &&
    confirm.length > 0 &&
    password !== confirm;

  const passwordIcon = (
    <GoLock className="absolute left-1 top-1/2 -translate-y-1/2 w-10 pointer-events-none" />
  );

  const handleSubmit = () => {
    setHasSubmitted(true);

    if (password !== confirm) return;
    onSuccess();
  };

  return (
    <section>
      <div className="flex justify-start mb-4 items-center mt-10">
        <LogInSideBarArrowButton onClose={onBack} />
        <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl text-white">
          New password
        </h1>
      </div>

      <div className="mt-10 space-y-4">
        <InputField
          placeHolder="New password"
          type="password"
          isPassword
          icon={passwordIcon}
          onChange={(e) => setPassword(e.target.value)}
          isMatchingPasswords={!showError}
          name={''}
        />

        <InputField
          placeHolder="Confirm new password"
          type="password"
          isPassword
          icon={passwordIcon}
          onChange={(e) => setConfirm(e.target.value)}
          isMatchingPasswords={!showError}
          name={''}
        />

        {showError && (
          <p className="text-red-400 text-sm text-center">
            Passwords do not match
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="
            w-full h-12 rounded-lg bg-[var(--color-secondary)]
            text-white mt-6
          "
        >
          Set new password
        </button>
      </div>
    </section>
  );
}
