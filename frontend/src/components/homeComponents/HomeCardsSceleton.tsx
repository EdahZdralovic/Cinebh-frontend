import MainCard from "../cards/MainCard.tsx";
import ArrowButton from "../buttons/ArrowButton.tsx";


export function HomeCardsSceleton() {

    return (
        <section className="flex justify-center px-[4%] items-center text-[var(--color-primary)]">
            <div className=" relative w-[93%] mt-10 rounded-3xl h-3/3 items-center animate-pulse ">
                <div className="flex justify-between align-middle  ">
                    <h1 className=" sm:text-[34px] text-[22px] font-bold text-gray-400">Loading</h1>
                </div>
                <div className="flex flex-col sm:flex-row  items-center gap-4 pt-4 ">

                    <MainCard coverImageUrl={"/assets/images/gray_photo_loading.avif"}
                              title="Loading" isMovie={false} street={"Loading"}/>
                    <MainCard coverImageUrl={"/assets/images/gray_photo_loading.avif"}
                              title="Loading" isMovie={false} street={"Loading"}/>
                    <MainCard coverImageUrl={"/assets/images/gray_photo_loading.avif"}
                              title="Loading" isMovie={false} street={"Loading"}/>
                    <MainCard coverImageUrl={"/assets/images/gray_photo_loading.avif"}
                              title="Loading" isMovie={false} street={"Loading"}/>

                </div>
                <div
                    className="flex animate-pulse flex-row justify-end items-center gap-4 pt-6 font-thin mr-0 mb-10 text-[16px]">
                    <div>
                        <span className=" text-gray-300 px-5 h-4">Loading </span>

                    </div>
                    <ArrowButton disabled={true} directionLeft={true} onClick={() => {
                        null
                    }}/>
                    <ArrowButton disabled={true} directionLeft={false} onClick={() => {
                        null
                    }}/>
                </div>
            </div>
        </section>
    );
}
