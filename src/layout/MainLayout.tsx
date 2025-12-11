import { type ReactNode, useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginSignupSideSection from '../components/sidebar-components/LoginSignupSideSection.tsx';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [signInOpen, setSignInOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-white">
      <Navbar onSignInClick={() => setSignInOpen(true)} />
      <main className="flex-grow">{children}</main>
      <Footer />
      {signInOpen && (
        <LoginSignupSideSection onClose={() => setSignInOpen(false)} />
      )}
    </div>
  );
}
ć;
