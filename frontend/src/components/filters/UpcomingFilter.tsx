



export default function UpcomingFilter (){


    return (
        <section className="mt-4 text-[var(--color-primary)]">
            <input type="text"  name="fullName" placeholder={"  Search Movies"}
                   className="w-full h-10 border-1 shadow-lg border-gray-300 rounded-md"  />
            <div className="flex flex-row justify-evenly ">
                <select placeholder="All Citys" className="w-full text-[var(--color-primary)]"></select>
                <select placeholder="All Cinemas" className="w-full"></select>
                <select placeholder="All Genres" className="w-full"></select>
                <select  typeof="date" placeholder="All Genres" className="w-full"></select>
            </div>
        </section>

    );

}