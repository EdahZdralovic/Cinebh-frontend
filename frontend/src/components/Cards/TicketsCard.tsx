import { Check } from "lucide-react";

export interface TicketsCardProps {
    title: string;
    price: number;
    disclaimer: string
    options: string[];
    isMainCard: boolean;
}

export function TicketsCard({title, price, disclaimer, options, isMainCard}: TicketsCardProps) {
    return (
        <div className={
            "relative text-center border rounded-3xl md:w-[29%] max-w-[408px] w-10/12 mb-8 pb-8 " +
            (isMainCard
                ? "shadow border-[#98A2B3] md:mt-0 md:mb-14 pt-12 md:min-h-[536px]"
                : "border-[#E4E7EC] md:mt-10 md:mb-24 md:min-h-[520px]")}>
            <h6 className="pt-8 font-bold text-[20px]">{title}</h6>
            <h4 className="pt-6 font-bold text-[32px]">{price} KM</h4>
            <p className="pt-6 font-light text-[16px]">{disclaimer}</p>
            {options.map((option) => (
                <span className="flex  pt-8 text-[16px] text-left pl-6 gap-3">
                        <Check className="text-[#B22222] text-left "/>{option} <br/></span>))}
            <button
                className={"mt-[68px] p-3 border rounded-xl border-[#B22222] "
                    + (isMainCard ? "bg-[#B22222] text-white" : "text-[#B22222]")}>
                Explore Movies
            </button>
        </div>
    );
}



