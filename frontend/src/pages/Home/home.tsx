import HomeCardsContainer from "../../components/HomeCardsContainer.tsx";
import { HomeHeroSection } from "../../components/HomeHeroSection.tsx";

export function Home() {
    const CurrenlyShowingRoute = "movies/currently-showing";
    const UpcomingRoute = "movies/upcoming";
    const VenuesRoute = "venues"
    return (
        <section>
            <div className="flex justify-center w-full grid grid-row">
                <HomeHeroSection/>
                <HomeCardsContainer sectionName={"Currently Showing"} type={CurrenlyShowingRoute} isMovie={true}/>
                <HomeCardsContainer sectionName={"Upcoming Movies"} type={UpcomingRoute} isMovie={true}/>
                <HomeCardsContainer sectionName={"Venues"} type={VenuesRoute} isMovie={false}/>
            </div>
        </section>
    );
}

