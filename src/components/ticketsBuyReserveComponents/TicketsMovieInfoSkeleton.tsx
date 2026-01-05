import { IMAGE_ROUTES } from '../../utils/Constants.ts';

export function TicketsMovieInfoSkeleton() {
  return (
    <section>
      <div className="grid grid-cols-6">
        <img
          src={IMAGE_ROUTES.GRAY_PHOTO}
          className="w-5/6 col-span-2 rounded-2xl"
        />
        <div className="col-span-4">
          <h2 className="text-xl font-bold mb-4">Loading…</h2>
        </div>
      </div>
    </section>
  );
}
