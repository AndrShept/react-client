import { Message } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { useAuth } from './useAuth';

export const useSocket = () => {
  const { userId, username } = useAuth();
  const [socket, setSocket] = useState<null | Socket>(null);

  const sendMessage = (dataMsg: Message) => {
    if (socket) {
      socket.emit('msg', dataMsg);
    } else {
      console.error('Socket is not connected.');
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      extraHeaders: {
        userId: userId as string,
        username: username as string,
      },
    });
    socket.on('connection', () => {});
    setSocket(socket);
  }, [userId]);
  const memoizedSocket = useMemo(() => socket, [socket]);
  return {
    socket: memoizedSocket,
    sendMessage,
  };
};
