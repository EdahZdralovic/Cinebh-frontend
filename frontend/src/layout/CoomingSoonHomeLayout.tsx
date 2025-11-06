import {type ReactNode} from "react";


interface CardsProps {
    children: ReactNode;
}
//a ovaj fajl realno mozemo i izbrisati on je na pocetku iz bog zna kojeg razloga napravljen
export default function CoomingSoonHomeLayout({children}: CardsProps) {


    return (
            <div className="flex flex-inline w-11/12 h-3/3">
                <main className="flex-grow">
                    {children}
                </main>
            </div>
    );
}