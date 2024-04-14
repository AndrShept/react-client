import { useEffect, useState } from 'react';

export const useDelay = (time = 2) => {
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const delay = async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, +`${time}000`);
      });
      setIsPending(false);
    };
    delay();
  }, []);

  return {
    isPending,
  };
};
