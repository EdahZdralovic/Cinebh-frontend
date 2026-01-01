interface SessionExpiredPopUpProps {
  open: boolean;
  onConfirmFirst: () => void;
  onConfirmSecond?: () => void;
  buttonText?: string;
  headerText?: string;
  descriptionText?: string;
  secondButton?: boolean;
  secondButtonText?: string;
}

export function SessionBuyTicketPopUp({
  open,
  onConfirmFirst,
  buttonText = 'Okay',
  secondButton = false,
  descriptionText = '',
  headerText = 'Session Expired',
  secondButtonText = 'Back to Home',
  onConfirmSecond,
}: SessionExpiredPopUpProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative  bg-white rounded-xl mt-[10%] p-6 w-[90%] max-w-md text-start ">
        <h2 className="text-xl font-bold mb-3">{headerText}</h2>
        <p className="text-gray-600 mb-6">{descriptionText}</p>
        <div className={'flex justify-end '}>
          {secondButton ? (
            <button
              onClick={onConfirmSecond}
              className=" items-center  border border-[var(--color-secondary)] mr-4 bg-white text-[var(--color-secondary)] px-4 py-2 rounded-lg "
            >
              {secondButtonText}
            </button>
          ) : (
            <></>
          )}
          <button
            onClick={onConfirmFirst}
            className=" items-center  bg-[var(--color-secondary)] text-white px-4 py-2 rounded-lg "
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
