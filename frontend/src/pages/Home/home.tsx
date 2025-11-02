import {type MainCardProps} from '../../components/cards/MainCard.tsx';
import HomeCardsSection from "../../components/HomeCardsSection.tsx";
import {useMovies} from "../../hooks/useMovies.ts";

const MOVIES : MainCardProps[] = [
        { title: "Napoleon", duration: 117, genre:"Action", imageUrl:"/assets/images/mock_up_picture.jpg" },

    { title: "Avatar", duration: 122, genre:"SF", imageUrl:"/assets/images/mock_up_picture.jpg" }
];



export default function Home() {
    const { movies, loading, error } = useMovies(0, 4);
    if (loading) {
        return <p className="text-center mt-20 text-gray-500">Loading movies...</p>;
    }
    if (error) {
        return <p className="text-black">{error}</p>;
    }
    return (
        <section>
            <div className="items-center">
                <HomeCardsSection cards={movies} cardsName="Currently Showing" />
            </div>
        </section>
    );
}
