import {type ReactNode} from "react";


interface CardsProps {
    children: ReactNode;
}

export default function CoomingSoonHomeLayout({children}:CardsProps){
        <div className="flex flex-inline w-11/12 h-3/3">
            <main className="flex-grow">
                {children}
            </main>
        </div>

    return();
}