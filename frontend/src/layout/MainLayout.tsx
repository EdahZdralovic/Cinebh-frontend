import type {ReactNode} from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({children}: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-white">
            <Navbar/>
            <main className="flex-grow">
                {children}
            </main>
            <Footer/>
        </div>
    );
}
