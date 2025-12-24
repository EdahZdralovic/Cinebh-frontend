import { type ReactNode, useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginSignupSideSection from '../components/sidebar-components/LoginSignupSideSection.tsx';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [signInOpen, setSignInOpen] = useState(false);

  function handleOpenSignIn() {
    setSignInOpen(true);
  }

  function handleCloseSignIn() {
    setSignInOpen(false);
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-white">
      <Navbar onSignInClick={handleOpenSignIn} />
      <main className="flex-grow">{children}</main>
      <Footer />
      {signInOpen && <LoginSignupSideSection onClose={handleCloseSignIn} />}
    </div>
  );
}
