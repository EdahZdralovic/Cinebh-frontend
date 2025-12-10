import { useEnterCodeInput } from '../../hooks/auth-hooks/useEnterCodeInput.ts';
import type { EnterCodeInputProps } from '../../types/AuthTypes.ts';

export function EnterCodeInput({ onComplete }: EnterCodeInputProps) {
  const CODE_LENGTH = 4;
  const { code, inputs, handleChange, handleKeyDown } = useEnterCodeInput(
    CODE_LENGTH,
    onComplete
  );

  return (
    <section className="flex flex-row gap-6 justify-center">
      {code.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-14 h-20 text-center text-5xl text-white bg-[var(--color-disabled-primary)]
                     border-[var(--color-disabled)] rounded-2xl border outline-none focus:border-4"
        />
      ))}
    </section>
  );
}
