import HomeCardsContainer from "../../components/home-components/HomeCardsContainer.tsx";
import { HomeHeroSection } from "../../components/home-components/HomeHeroSection.tsx";
import VenuesTicker from "../../components/home-components/VenuesTicker.tsx";
import {HomeCardsSceleton} from "../../components/home-components/HomeCardsSceleton.tsx";

function Home() {
    const CurrenlyShowingRoute = "movies/currently-showing";
    const UpcomingRoute = "movies/upcoming";
    const VenuesRoute = "venues"
    return (
        <section>
            <div className="flex w-full grid grid-row">

                <HomeHeroSection/>
                <VenuesTicker type={VenuesRoute} size={22}/>
                <HomeCardsContainer sectionName={"Currently Showing"} type={CurrenlyShowingRoute} isMovie={true}
                                    seeAllLink={"/showing"}/>
                <HomeCardsContainer sectionName={"Upcoming Movies"} type={UpcomingRoute} isMovie={true}
                                    seeAllLink={"/upcoming"}/>
                <HomeCardsContainer sectionName={"Venues"} type={VenuesRoute} isMovie={false} seeAllLink={"/venues"}/>
                <HomeCardsSceleton />
            </div>
        </section>
    );
}

export default Home;

