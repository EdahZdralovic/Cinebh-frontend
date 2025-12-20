import { useEnterCodeInput } from '../../hooks/auth-hooks/useEnterCodeInput.ts';
import type { EnterCodeInputProps } from '../../types/AuthTypes.ts';
import { handlePaste } from '../../utils/AuthFunctions.ts';

export function EnterCodeInput({ onComplete }: EnterCodeInputProps) {
  const CODE_LENGTH = 4;
  const { code, setCode, inputs, handleChange, handleKeyDown } =
    useEnterCodeInput(CODE_LENGTH, onComplete);

  return (
    <section className="flex flex-row gap-6 justify-center">
      {code.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputs.current[idx] = el as HTMLInputElement;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onPaste={(e) =>
            handlePaste({
              e,
              code,
              setCode,
              inputs,
              codeLength: CODE_LENGTH,
              onComplete,
            })
          }
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-14 h-20 text-center text-5xl text-white bg-[var(--color-disabled-primary)] border-[var(--color-disabled)] rounded-2xl border outline-none focus:border-4"
        />
      ))}
    </section>
  );
}
