import { useRef, useState } from 'react';
import { KEYBOARD } from '../../utils/Constants.ts';

export function useEnterCodeInput(
  length: number,
  onComplete: (code: string) => void
) {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    const isValidInput =
      value === '' || (value.length < 5 && value >= '0' && value <= '9999');
    if (!isValidInput) return;
    if (value.length > 1) {
    }
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
    if (e.key !== KEYBOARD.BACKSPACE) return;
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
