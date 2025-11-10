import React from "react";
import { differenceInCalendarDays, format, parseISO, startOfToday } from 'date-fns';

export interface MainCardProps {
    coverImageUrl: string;
    title: string;
    duration?: number;
    movieGenres?: string[];
    street?: string;
    isMovie?: boolean;
    synopsis?: string;
    redStrip?: boolean;
    projectionStart?: string;
}

export function openingLabel(projectionStart: string) {

    const target = parseISO(projectionStart);
    if (isNaN(target.getTime())) return "";
    const today = startOfToday();

    const diff = differenceInCalendarDays(target, today);
    if (diff >= 0 && diff <= 7) {
        return `Opens ${format(target, "EEEE")}`;
    }

    return format(target, "EEE, MMM d, yyyy");
}

export default function MainCard({
                                     coverImageUrl,
                                     duration,
                                     title,
                                     movieGenres,
                                     street,
                                     isMovie,
                                     redStrip = false,
                                     projectionStart = ""
                                 }: MainCardProps) {


    const genre = movieGenres?.[0]

    const dateForLabel = openingLabel(projectionStart as string);

    let detailsContent: React.ReactNode = null;
    if (isMovie) {
        detailsContent = (
            <div className="">
                <span className="whitespace-nowrap pr-2">{duration} MIN</span>
                <span className="h-5 w-px bg-[var(--color-gray-text)] mx-2 inline-block align-text-bottom "></span>
                <span className="px-2">{genre}</span>
            </div>);
    } else {
        detailsContent = (
            <div><span className="text-[var(--color-gray-text] text-wrap ">{street}</span></div>);
    }
    return (
        <div
            className="text-[var(--color-primary)]  shadow-lg relative border grid sm:max-w-[24%] max-w-[300px] items-center grid-col-1   rounded-3xl">
            <div className="relative m-4  aspect-[94/100] ">
                <img src={coverImageUrl} alt={title}
                     className="relative h-full z-30 w-[100%] rounded-2xl object-cover"/>
                {redStrip ? (
                    <>
                        <div
                            className="absolute inline-flex items-center top-[6.0%] sm:top-[5.7%] sm:right-[-2.19%] right-[-2.07%] z-40 h-5 bg-[var(--color-secondary)] rounded-l rounded-se-md py-4 px-2">
                            <span
                                className="whitespace-nowrap font-medium text-[14px] p1-2 text-white">{dateForLabel}</span>
                        </div>
                        <div
                            className="absolute z-90 right-[-2.1%] top-[17.3%]  sm:top-[16.3%] border-x-[14px] border-x-transparent border-t-[22px] border-t-[var(--color-secondary)]">
                        </div>
                    </>) : null}
            </div>
            <div className="font-semibold pl-4 text-[20px] pb-2 ">
                {title}
            </div>
            <div
                className="pl-4 text-[16px] text-[var(--color-gray-text)] tracking-[1.25%] pb-5 font-thin inline-flex items-center gap-2">
                {detailsContent}
            </div>
        </div>
    );
}

