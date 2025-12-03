import { type ReactNode, useState } from 'react';

interface InputFieldProps {
  icon: ReactNode;
  placeHolder?: string;
  type?: string;
  onSubmit?: () => void;
  name: string;
  isPassword: boolean;
}

export function InputField({
                             icon,
                             placeHolder,
                             type = '', name,
                             isPassword,
                           }: InputFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  {
    isPassword ? (
    const [show, setShow] = useState(false);
  ) :
    'null';
  }
  return (
    <div className={'flex mt-2  w-full text-lg flex-col justify-start'}>
      <h5 className={''}> {name}</h5>

      <div className={(isOpen
          ? ' text-[var(--color-secondary)] '
          : ' text-[var(--color-primary)] ') +
        'relative bg-white items-center mb-2 rounded-lg '
      }
      >
        {icon}
        <input
          className={'h-12 rounded-lg w-full pl-10 min-w-[350px] '}
          type={type}
          placeholder={placeHolder}
          onToggle={() => setIsOpen(true)}
        />
      </div>

    </div>
  );
}
