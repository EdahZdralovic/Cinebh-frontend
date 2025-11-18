import MainCard from "../cards/MainCard.tsx";
import ArrowButton, { ArrowDirection } from "../buttons/ArrowButton.tsx";

export function HomeCardsSkeleton() {
  return (
    <section className="flex justify-center px-[4%] items-center text-[var(--color-primary)]">
      <div className=" relative w-[93%] mt-8 h-3/3 items-center animate-pulse ">
        <div className="flex justify-between align-middle  ">
          <h1 className=" sm:text-[34px] text-[22px] font-bold text-[var(--color-gray-text)]">Loading</h1>
        </div>
        <div className="flex flex-col sm:flex-row  items-center gap-4 pt-4 ">
          <MainCard coverImageUrl={"/assets/images/gray_photo_loading.avif"}
                    title="Loading" isMovie={false} street={"Loading"} redStrip={false}
                    projectionStart={"22-12-2012"} />
          <MainCard coverImageUrl={"/assets/images/gray_photo_loading.avif"}
                    title="Loading" isMovie={false} street={"Loading"} redStrip={false}
                    projectionStart={"22-12-2012"} />
          <MainCard coverImageUrl={"/assets/images/gray_photo_loading.avif"}
                    title="Loading" isMovie={false} street={"Loading"} redStrip={false}
                    projectionStart={"22-12-2012"} />
          <MainCard coverImageUrl={"/assets/images/gray_photo_loading.avif"}
                    title="Loading" isMovie={false} street={"Loading"} projectionStart={"22-12-2012"} />
        </div>
        <div
          className="flex animate-pulse flex-row justify-end items-center gap-4 pt-6 font-thin mr-0 mb-10 text-[16px]">
          <div>
            <span className=" text-[var(--color-gray-text)] px-5 h-4">Loading </span>
          </div>
          <ArrowButton disabled={true} direction={ArrowDirection.Left} onClick={() => {
            null;
          }} />
          <ArrowButton disabled={true} direction={ArrowDirection.Right} onClick={() => {
            null;
          }} />
        </div>
      </div>
    </section>
  );
}
