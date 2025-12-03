import SelectFilterSkeleton from './generic-select-filter/SelectFilterSkeleton.tsx';

export function FiltersSkeleton() {
  const COUNT = 4;
  return (
    <section>
      <div className="grid grid-cols-4 mt-4 gap-4">
        {Array.from({ length: COUNT }).map((_, i) => (
          <SelectFilterSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
