import HomeCardsContainer from "../../components/HomeCardsContainer.tsx";

export default function Home() {
    return (
        <section>
            <div className="items-center grid grid-row">
                <HomeCardsContainer cardsName={"Currently Showing"} type={"movies/currently-showing"} isMovie={true}/>
                <HomeCardsContainer cardsName={"Upcoming"} type={"movies/upcoming"} isMovie={true}/>
                <HomeCardsContainer cardsName={"Venues"} type={"venues"} isMovie={false}/>
            </div>
        </section>
    );
}

