import React from "react";

export interface MainCardProps {
    coverImageUrl: string;
    title: string;
    duration?: number;
    genre?: string;
    address?: string;

}

export default function MainCard({ coverImageUrl, title, duration, genre, address}: MainCardProps) {
    //kartica je univerzalna i za filmove i za kina (jer isti je dizajn)
    //filmovi imaju genre i duration a kino ima adresu
    const isMovie = duration != null;
    let detailsContent: React.ReactNode = null;
    if (isMovie) {
        detailsContent = (
            <>
                <span className="whitespace-nowrap">{duration} MIN</span>
                <span className="h-5 w-px bg-[#667085]/100 ml-1 mr-1"/>
                <span className="truncate">{genre}</span>
            </>
        );
    } else if (address != null) {
        detailsContent = <span className="truncate max-w-[220px] sm:max-w-[265px]">{address}</span>;
    } else {
        detailsContent = null;
    }

    return (
        <div
            className="text-[#1D2939] shadow-lg relative border grid grid-rows-12grid-col-1 items-center  rounded-3xl flex w-[255px] sm:w-[302px]  ">
            <div className="relative m-4  aspect-[94/100]  ">
                <img src={coverImageUrl} alt={title}
                     className="relative h-full w-[100%] rounded-2xl max-w-[220px] sm:max-w-[400px] object-cover"/>
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

