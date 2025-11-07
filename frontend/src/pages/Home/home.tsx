import HomeCardsContainer from "../../components/homeComponents/HomeCardsContainer.tsx";
import { HomeHeroSection } from "../../components/homeComponents/HomeHeroSection.tsx";
import VenuesTicker from "../../components/homeComponents/VenuesTicker.tsx";

function Home() {
    const CurrenlyShowingRoute = "movies/currently-showing";
    const UpcomingRoute = "movies/upcoming";
    const VenuesRoute = "venues"
    return (
        <section>
            <div className="flex justify-center w-full grid grid-row">

                <HomeHeroSection/>
                <VenuesTicker type={VenuesRoute} size={22}/>
                <HomeCardsContainer sectionName={"Currently Showing"} type={CurrenlyShowingRoute} isMovie={true}
                                    seeAllLink={"/showing"}/>
                <HomeCardsContainer sectionName={"Upcoming Movies"} type={UpcomingRoute} isMovie={true}
                                    seeAllLink={"/upcoming"}/>
                <HomeCardsContainer sectionName={"Venues"} type={VenuesRoute} isMovie={false} seeAllLink={"/venues"}/>

            </div>
        </section>
    );
}

export default Home;

