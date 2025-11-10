export function HomeCardsErrorMessage( { errorCode, errorMessage, }: { errorMessage: string, errorCode: string }) {

    return (
        <section className="flex  items-center text-[var(--color-primary)]">
            <div className=" relative w-[93%] mt-10 flex flex-col justify-center rounded-3xl pb-10 h-3/3 items-center">
                <p className="font-medium text-2xl">Ups, something went wrong </p>
                <p className="fotn-bold text-red-500 text-3xl">{errorCode}</p>
                <p className="fotn-bold text-red-500 text-xl">{errorMessage}</p>
            </div>
        </section>
    );
}