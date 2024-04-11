import { useCurrentQuery } from '@/lib/services/userApi';
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useCurrentQuery();
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin size-10" />
      </div>
    );
  }

  return children;
};
