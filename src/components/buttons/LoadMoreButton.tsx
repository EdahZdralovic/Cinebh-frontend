interface LoadMoreButtonProps {
    disabled: boolean;
    onClick: () => void;

}

export function LoadMoreButton({disabled = false, onClick}: LoadMoreButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled}
                className={"text-[16px] font-semibold underline " + (disabled ? " text-[var(--color-disabled)] " : " text-[var(--color-secondary)] ")}
        >Load more</button>
    );
}