import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SignInNavbarButton } from './buttons/SignInNavbarButton.tsx';

interface NavbarProps {
  onSignInClick: () => void;
}

export default function Navbar({ onSignInClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const userName = user?.email.split('@')[0];
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch {}
  }
  return (
    <nav className="sticky top-0 left-0 w-full h-[80px] bg-[var(--color-primary)] text-white flex items-center justify-between px-10 z-50 border-b border-gray-500">
      <Link to="/">
        <div className="flex items-center gap-2 pl-2 md:pl-12 z-100">
          <img
            src="/assets/logos/Logo.png"
            alt="CineBH Logo"
            width={130}
            height={32}
            className="object-contain"
          />
        </div>
        <div className="md:hidden w-[28px]" />
      </Link>
      <div className="flex flex-header items-center">
        <div className="gap-6 absolute left-1/2 transform -translate-x-1/2 justify-items-center text-sm hidden md:flex">
          <Link
            to="/showing"
            className="hover:font-semibold hover:underline underline-offset-4 hover:-mx-[2px]"
          >
            Currently Showing
          </Link>
          <Link
            to="/upcoming"
            className=" hover:font-semibold hover:underline underline-offset-4 hover:-mx-[2px]"
          >
            Upcoming Movies
          </Link>
        </div>
        <div className="hidden md:flex items-center ">
          <SignInNavbarButton
            userLabel={userName}
            onSignInClick={onSignInClick}
            onLogout={handleLogout}
          />
        </div>
        <div className="md:hidden">
          {isOpen ? (
            <X size={28} onClick={() => setIsOpen(false)} />
          ) : (
            <Menu size={28} onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute left-0 top-full w-full md:hidden shadow-lg bg-[var(--color-primary)] border-t border-white/10">
          <nav className="mx-auto flex max-w-[2000px] flex-col items-center gap-4 px-6 py-8">
            <Link
              to="/showing"
              onClick={() => setIsOpen(false)}
              className="text-base"
            >
              Currently Showing
            </Link>
            <Link
              to="/upcoming"
              onClick={() => setIsOpen(false)}
              className="text-base"
            >
              Upcoming Movies
            </Link>
            <SignInNavbarButton
              userLabel={userName}
              onSignInClick={onSignInClick}
              onLogout={handleLogout}
            />
          </nav>
        </div>
      )}
    </nav>
  );
}
