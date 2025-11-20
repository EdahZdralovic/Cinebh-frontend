import { useEffect } from 'react';

export function useClickOutside(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('[data-filter]')) {
        onClose();
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, onClose]);
}
