import { type ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSidebar } from '../context/SideBarContext.tsx';

interface MainLayoutProps {
  children: ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  const { openAuth } = useSidebar();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-white">
      <Navbar onSignInClick={openAuth} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
