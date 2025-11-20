export function HomeHeroSkeleton() {
  return (
    <section className={'flex items-center justify-center'}>
      <div
        className={
          'w-full sm:aspect-[16/8] aspect-[9/16] text-center flex justify-center text-gray-500 text-3xl animate-pulse bg-gray-200'
        }
      >
        <div className="h-20 w-20 sm:mt-[20%] mt-[80%] rounded-full border-4 border-gray-500 border-t-transparent animate-spin" />
      </div>
    </section>
  );
}
