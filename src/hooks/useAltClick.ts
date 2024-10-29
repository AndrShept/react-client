import { useEffect } from 'react';

export const useAltClick = (callback: () => void) => {
  useEffect(() => {
    const handleMouseClick = (event: MouseEvent) => {
      // Перевіряємо, чи натиснуто Alt та чи виконано клік миші
      if (event.altKey && event.type === 'click') {
        callback();
      }
    };

    // Додаємо обробник події
    document.addEventListener('click', handleMouseClick);

    // Видаляємо обробник події під час демонтажу компонента
    return () => {
      document.removeEventListener('click', handleMouseClick);
    };
  }, [callback]);
};


