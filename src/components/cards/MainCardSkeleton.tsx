export function MainCardSkeleton() {
  return (
    <section>
      <div className="justify-center z-0 shadow-lg w-auto relative grid items-center grid-col-1 rounded-3xl">
        {/* IMAGE */}
        <div className="relative m-4 aspect-[94/100]">
          <div className="w-full h-full bg-gray-200 rounded-2xl animate-pulse" />
        </div>

        {/* TITLE */}
        <div className="font-semibold pl-4 truncate text-xl pb-2">
          <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* DETAILS */}
        <div className="pl-4 text-md tracking-[1.25%] pb-5 font-thin inline-flex items-center gap-2">
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </section>
  );
}
