import { useSidebar } from '../../context/SideBarContext.tsx';

interface SignUpProjectionsButtonProps {
  isLoggedIn?: boolean;
  textBeforeButton?: string;
}
export function SignUpProjectionsButton({
  isLoggedIn = false,
  textBeforeButton = '',
}: SignUpProjectionsButtonProps) {
  const { openAuth } = useSidebar();
  return (
    <section>
      {!isLoggedIn && (
        <div className={'flex justify-center items-center '}>
          <p className={''}>{textBeforeButton}</p>
          <button
            className={'underline md:ml-3 font-bold  '}
            onClick={openAuth}
          >
            Sign Up
          </button>
        </div>
      )}
    </section>
  );
}
