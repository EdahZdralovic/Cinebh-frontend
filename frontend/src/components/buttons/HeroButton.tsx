interface HeroButtonProps {
    isActive: boolean;
    onClick: () => void;
}

export function HeroButton({isActive, onClick}: HeroButtonProps) {

    return (
        <button onClick={onClick}
                className={`h-1 w-8 rounded-xl ${isActive ? "bg-white " : "bg-gray-200/60 hover:bg-white"}`}
        />
    );
}
