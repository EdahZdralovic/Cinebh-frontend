import HomeCardsContainer from '../../components/home-components/HomeCardsContainer.tsx';
import HomeHeroSection from '../../components/home-components/HomeHeroSection.tsx';
import VenuesTicker from '../../components/home-components/VenuesTicker.tsx';
import { useScrollToTop } from '../../hooks/useScrollToTop.ts';
import { ROUTES } from '../../utils/Constants.ts';

export default function Home() {
  useScrollToTop();
  const TICKER_SIZE = 20;
  return (
    <section>
      <div className="flex w-full grid grid-row">
        <HomeHeroSection />
        <VenuesTicker type={ROUTES.VENUES} size={TICKER_SIZE} />
        <HomeCardsContainer
          sectionName={'Currently Showing'}
          type={ROUTES.CURRENTLY_SHOWING}
          isMovie={true}
          seeAllLink={'/showing'}
          isVenueContainer={false}
        />
        <HomeCardsContainer
          sectionName={'Upcoming Movies'}
          type={ROUTES.UPCOMING}
          isMovie={true}
          seeAllLink={'/upcoming'}
          isVenueContainer={false}
        />
        <HomeCardsContainer
          sectionName={'Venues'}
          type={ROUTES.VENUES}
          isMovie={false}
          seeAllLink={'/venues'}
          isVenueContainer={true}
        />
      </div>
    </section>
  );
}
