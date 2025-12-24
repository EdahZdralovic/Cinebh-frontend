import { createContext, useContext, useState } from 'react';
import LoginSignupSideSection from '../components/sidebar-components/LoginSignupSideSection.tsx';

type SidebarContextType = {
  openAuth: () => void;
  closeAuth: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAuth = () => setIsOpen(true);
  const closeAuth = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ openAuth, closeAuth }}>
      {children}
      {isOpen && <LoginSignupSideSection onClose={closeAuth} />}
    </SidebarContext.Provider>
  );
}
export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used inside SidebarProvider');
  return ctx;
}
