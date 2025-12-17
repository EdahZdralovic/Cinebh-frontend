import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { FaRegBell } from 'react-icons/fa';

interface SignInNavbarButtonProps {
  onSignInClick?: () => void;
  onLogout?: () => void;
  userLabel?: string;
}

export function SignInNavarButton({
  onSignInClick,
  onLogout,
  userLabel,
}: SignInNavbarButtonProps) {
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!userLabel;

  const handleMainClick = () => {
    if (!isLoggedIn) {
      onSignInClick?.();
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="relative flex flex-row ">
      {isLoggedIn && (
        <button className="transition p-2 md:border border-[var(--color-disabled-primary)] mx-4 px-3 rounded-lg">
          <FaRegBell size={20} />
        </button>
      )}
      <button
        onClick={handleMainClick}
        className="md:h-12 px-6 bg-[var(--color-primary)]  mr-14 rounded-lg md:border border-white text-white flex items-center gap-2"
      >
        <span>{isLoggedIn ? userLabel : 'Sign In'}</span>
        {isLoggedIn && <IoIosArrowDown className={open ? 'rotate-180' : ''} />}
      </button>
      {open && isLoggedIn && (
        <div className="absolute top-11  right-12 mr-4 mt-2 z-40 w-[90px] bg-[var(--color-primary)] rounded-lg shadow-lg overflow-hidden">
          <button
            onClick={onLogout}
            className="w-full px-3 py-3 border rounded-lg border-white font-bold text-left hover:bg-gray-600"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
