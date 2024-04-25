import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { useAuth } from './useAuth';

export const useSocket = () => {
  const { userId } = useAuth();
  const [socket, setSocket] = useState<null| Socket>(null)

  useEffect(() => {
    const socket = io('http://localhost:3000', {
        extraHeaders: {
          userId: userId as string,
        },
      });
    socket.on('connection', () => {});
    setSocket(socket)
  }, [userId]);

  return {
    socket,
  };
};
