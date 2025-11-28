type RedStripDateProps = {
  label: string;
};

export default function RedStripDate({ label }: RedStripDateProps) {
  return (
    <div className="absolute top-[6%] right-[-2%] flex flex-col items-end">
      <div className="inline-flex z-10 items-center h-5 bg-[var(--color-secondary)] rounded-l rounded-se-md py-4 px-2">
        <span className="whitespace-nowrap font-medium text-sm pl-2 text-white">
          {label}
        </span>
      </div>
      <div className="z-0 right-[100%] top-[17.3%] sm:top-[16.3%] border-x-[14px] border-x-transparent border-t-[22px] border-t-[var(--color-secondary)]"></div>
    </div>
  );
}
