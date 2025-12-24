import { FaArrowLeft } from 'react-icons/fa6';

interface LogInSideBarArrowButtonProps {
  onClose: () => void;
}
export function LogInSideBarArrowButton({
  onClose,
}: LogInSideBarArrowButtonProps) {
  return (
    <button
      className={
        'bg-[#FCFCFD] bg-opacity-10 rounded-lg aspect-square h-11 border-gray-400  text-2xl'
      }
      onClick={onClose}
    >
      <FaArrowLeft className={'text-[var(--color-second-white)] ml-3 '} />
    </button>
  );
}
