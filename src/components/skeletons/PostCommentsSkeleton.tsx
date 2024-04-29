import { Skeleton } from '../ui/skeleton';

export const PostCommentsSkeleton = () => {
  return (
    <>
      <div className="flex gap-3 flex-col">
        <div className="flex gap-2">
          <Skeleton className="size-9 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>

        <Skeleton className="max-w-[300px] h-28 rounded-xl " />
      </div>
      <div className="flex gap-3 flex-col">
        <div className="flex gap-2">
          <Skeleton className="size-9 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>

        <Skeleton className="max-w-[300px] h-28 rounded-xl  " />
      </div>
    </>
  );
};
