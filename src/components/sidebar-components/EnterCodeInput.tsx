import { useRef, useState } from 'react';

export function EnterCodeInput() {
  const CODE_LENGTH = 4;

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // dozvoli samo jednu cifru

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // automatski fokus na sljedece polje
    if (value && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <section className={' flex flex-row gap-6 justify-center '}>
      {code.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => (inputs.current[idx] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, idx)}
          className=" w-14 h-20 text-center text-5xl text-white bg-[var(--color-disabled-primary)]
            border-[var(--color-disabled)] rounded-2xl border outline-none focus:border-4
          "
        />
      ))}
    </section>
  );
}
