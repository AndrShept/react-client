import { useEffect, useState } from 'react';

export const useDelay = (time = 2000) => {
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const delay = async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, time);
      });
      setIsPending(false);
    };
    delay();
  }, []);

  return {
    isPending,
  };
};
