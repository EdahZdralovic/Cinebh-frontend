import { useRef, useState } from 'react';

export function useEnterCodeInput(
  length: number,
  onComplete: (code: string) => void
) {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    const isValidInput =
      value === '' || (value.length === 1 && value >= '0' && value <= '9');
    if (!isValidInput) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (newCode.every((d) => d !== '')) {
      onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key !== 'Backspace') return;
    const copy = [...code];

    if (copy[index] !== '') {
      copy[index] = '';
      setCode(copy);
      return;
    }
    if (index > 0) {
      copy[index - 1] = '';
      setCode(copy);
      inputs.current[index - 1]?.focus();
    }
  };

  return {
    code,
    inputs,
    handleChange,
    handleKeyDown,
  };
}
