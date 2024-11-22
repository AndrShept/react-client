import { useEffect } from 'react';

export const useAltClick = (callback: () => void) => {
  useEffect(() => {
    const handleMouseClick = (event: MouseEvent) => {
      if (event.altKey && event.type === 'click') {
        callback();
      }
    };

    document.addEventListener('click', handleMouseClick);

    return () => {
      document.removeEventListener('click', handleMouseClick);
    };
  }, [callback]);
};
