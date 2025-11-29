interface LoadMoreButtonProps {
    disabled: boolean;
    onClick: () => void;

}

export function LoadMoreButton({disabled = false, onClick}: LoadMoreButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled}
                className={"text-md font-semibold underline " + (disabled ? " hidden " : " text-[var(--color-secondary)] ")}
        >Load more</button>
    );
}

