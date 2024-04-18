
import { useAppSelector } from './store';

export const useAuth = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const current = useAppSelector((state) => state.user.current);


  return {
    userId: current?.id,
    userData: current,
    username: current?.username,
    isAuthenticated,
  };
};
