import type { CrewMemberProps } from '../../../types/MovieTypes.ts';

interface ActorsContainerProps {
  actors: CrewMemberProps[];
}

export function ActorsContainer({ actors }: ActorsContainerProps) {
  return (
    <section>
      <span className="h-9 w-[2px] bg-[var(--color-secondary)] mr-4  inline-block   text-gray-500 text-3xl font-bold ">
        &nbsp;&nbsp;Cast
      </span>
      <div className={'mt-3 text-lg grid grid-cols-3  '}>
        {actors.map((actor, index) => (
          <div className={'my-4'}>
            <span key={index} className={'text-lg font-bold'}>
              {actor.fullName}
            </span>
            <p className={' text-md text-gray-500'}>{actor.characterName}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
