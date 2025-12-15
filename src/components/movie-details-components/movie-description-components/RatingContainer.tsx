import { RatingBox } from './RatingBox.tsx';

interface RatingContainerProps {
  rottenTomatoesRating: number;
  imdbRating: number;
}
export function RatingContainer({
  rottenTomatoesRating,
  imdbRating,
}: RatingContainerProps) {
  return (
    <section>
      <span className="h-9 mt-8 w-[2px] bg-[var(--color-secondary)] mr-4  inline-block   text-gray-500 text-3xl font-bold ">
        &nbsp;&nbsp;Rating
      </span>
      <div className={'flex gap-4 mt-6 md:mb-14 mb-6'}>
        <RatingBox name={'Rotten Tomatoes'} rating={rottenTomatoesRating} />
        <RatingBox name={'IMDB Rating'} rating={imdbRating} />
      </div>
    </section>
  );
}
