interface GenreButtonProps {
  name?: string;
}

export default function GenreButton({ name }: GenreButtonProps) {
  return (
    <button className="sm:h-[32px] h-6 px-2 mb-2 w-auto font-thin text-xs text-[var(--color-primary)]  bg-gray-200 rounded-[8px] ">
      {name}
    </button>
  );
}
