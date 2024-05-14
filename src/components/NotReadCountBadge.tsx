import { cn } from '@/lib/utils';

export const NotReadCountBadge = ({
  notReadMessageCount,
  classname
}: {
  notReadMessageCount: number;
  classname?: string;
}) => {
  return (
    <div
      className={cn(
        'ml-auto mb-auto size-5 text flex items-center justify-center bg-indigo-600 rounded-full ring-2 ring-indigo-200 text-[11px]',
        classname,
      )}
    >
      <p className="">{notReadMessageCount}</p>
    </div>
  );
};
