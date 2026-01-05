import { SeeAlsoMovies } from '../SeeAlsoMovies.tsx';

interface MovieNotFoundComponentProps {
  Not404Error?: boolean;
  errorMessage?: string;
}

export function MovieNotFoundComponent({
  Not404Error = false,
  errorMessage = ' ',
}: MovieNotFoundComponentProps) {
  return (
    <section>
      <div
        className={
          'flex flex-col gap-2 justify-center px-[6%] py-10 items-center'
        }
      >
        {Not404Error ? (
          <>
            <h1
              className={
                'text-[var(--color-secondary)] p-10 text-2xl font bold self-center'
              }
            >
              Oops, our bad, this is error page .
            </h1>
            <span>{errorMessage}</span>
          </>
        ) : (
          <h1
            className={'text-[var(--color-secondary)] p-10 text-2xl font bold'}
          >
            Movie that you are looking for doesn't exist on our platform yet.
          </h1>
        )}
        <h2 className={'text-[var(--color-primary)] text-2xl p-10 '}>
          Maybe you can find something down below.
        </h2>

        <div className={'mt-14'}>
          <SeeAlsoMovies />
        </div>
      </div>
    </section>
  );
}
