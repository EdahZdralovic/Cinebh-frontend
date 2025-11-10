import { ArrowLeft, ArrowRight } from "lucide-react";

interface ArrowLeftButtonProps {
    onClick: () => void;
    disabled?: boolean;
    directionLeft: boolean;
}

export default function ArrowButton({onClick, disabled = false, directionLeft}: ArrowLeftButtonProps) {
    const Direction = directionLeft ? ArrowLeft : ArrowRight;
    return (
        <button onClick={onClick} disabled={disabled}
                className="text-[var(--color-primary)] font- p-3 border border-gray-200 rounded-[8px] ">
            < Direction size={20} strokeWidth={2}
                        className={disabled ? "text-[var(--color-disabled)]" : "text-[var(--color-primary)]"}/>
        </button>
    );
}
