import {
  useUserOfflineMutation,
  useUserOnlineMutation,
} from '@/lib/services/userApi';
import { Message } from '@/lib/types';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Socket, io } from 'socket.io-client';

import { useAuth } from '../../hooks/useAuth';

interface SocketContextProps {
  socket: null | Socket;
  isConnected: boolean;
  sendMessage: (msg: Message) => void;
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  isConnected: false,
  sendMessage: () => {},
});
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<null | Socket>(null);
  const { username, userId } = useAuth();
  // const [userOnline] = useUserOnlineMutation();

  const sendMessage = (dataMsg: Message) => {
    socket?.emit('msg', dataMsg);
  };
  useEffect(() => {
    if (!userId) return;
    const socketInstance = io('http://localhost:3000', {
      extraHeaders: {
        userId: userId,
        username: username!,
      },
      auth: {
        userId: userId!,
      },
    });

    const onConnect = async () => {
      setIsConnected(true);
      setSocket(socketInstance);
      // await userOnline();
    };
    const onDisconnect = async () => {
      setIsConnected(false);
    };
    socketInstance.on('connect', onConnect);
    socketInstance.on('disconnect', onDisconnect);

    return () => {
      socketInstance.off('connect', onConnect);
      socketInstance.off('disconnect', onDisconnect);
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ isConnected, socket, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
