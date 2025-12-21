import { convertToVideo } from '../../../utils/movieFunctions.ts';

interface MediaContainerProps {
  videoUrl: string;
  mediaPhotos: string[];
}

export function MediaContainer({ videoUrl, mediaPhotos }: MediaContainerProps) {
  return (
    <section>
      <div
        className={
          'grid md:grid-cols-2 grid-cols-1 max-h-[50%] md:gap-4 gap-2 md:mt-8 mt-3 '
        }
      >
        {videoUrl && (
          <div className="h-full ">
            <iframe
              src={convertToVideo(videoUrl)}
              title="Movie trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="md:rounded-l-2xl md:rounded-bl-2xl md:rounded-none rounded-xl  w-full aspect-video"
            ></iframe>
          </div>
        )}
        <div className={'grid grid-cols-2 w-full md:pr-4 md:gap-4  gap-2 '}>
          {mediaPhotos.map((media, index) => (
            <img
              alt={'Movie picture'}
              src={media}
              key={index}
              className={
                ' bg-cover aspect-video md:rounded-none rounded-lg md:h-[100%]  object-cover ' +
                (index === 3 ? ' md:rounded-br-2xl' : ' ') +
                (index === 1 ? ' md:rounded-tr-2xl' : ' ') +
                (index > 3 ? 'hidden ' : ' ')
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
