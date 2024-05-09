import { Loader2 } from 'lucide-react';

export const Spinner = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader2 className="animate-spin size-9" />
    </div>
  );
};
