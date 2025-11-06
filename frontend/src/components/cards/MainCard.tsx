import React from "react";

export interface MainCardProps {
    coverImageUrl: string;
    title: string;
    duration?: number;
    movieGenres?: string[];
    street?: string;
    isMovie?: boolean;
    synopsis?: string;
}

export default function MainCard({coverImageUrl,duration, title, movieGenres, street, isMovie}: MainCardProps) {
    //kartica je univerzalna i za filmove i za kina (jer isti je dizajn)
    //filmovi imaju genre i duration a kino ima adresu

    const genre = movieGenres?.[0]

    let detailsContent: React.ReactNode = null;
    if (isMovie) {
        detailsContent = (
            <div className="">
                <span className="whitespace-nowrap pr-2">{duration} MIN</span>
                <span className="h-5 w-px bg-[#667085] mx-2 inline-block align-text-bottom "></span>
                <span className="px-2">{genre}</span>
            </div> );   }
    else {
        detailsContent = (
            <div> <span className="text-[#667085] text-wrap ">{street}</span> </div>);
    }
    return (
        <div
            className="text-[#1D2939]  shadow-lg relative border grid sm:w-[25%] items-center grid-col-1   rounded-3xl flex ">
            <div className="relative m-4  aspect-[94/100] ">
                <img src={coverImageUrl} alt={title}
                     className="relative h-full w-[100%] rounded-2xl object-cover"/>
            </div>
            <div className="font-semibold pl-4 text-[20px] pb-2 ">
                {title}
            </div>
            <div
                className="pl-4 pb-2 text-[16px] text-[#667085] tracking-[1.25%] pb-5 font-thin inline-flex items-center gap-2">
                {detailsContent}
            </div>
        </div>
    );
}

