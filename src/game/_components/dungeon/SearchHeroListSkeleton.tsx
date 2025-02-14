import { Skeleton } from '@/components/ui/skeleton';

export const SearchHeroListSkeleton = () => {
  return (
    <ul className="flex flex-col gap-2">
      {[...new Array(4)].map((_, idx) => (
        <li key={idx} className="flex gap-1.5 items-center w-full  ">
          <Skeleton className="size-10 rounded-full flex-shrink-0" />
          <div className="space-y-1 w-full">
            <Skeleton className="w-36 h-3.5 rounded-md" />
            <Skeleton className="w-24 h-3 rounded-md" />
          </div>
        </li>
      ))}
    </ul>
  );
};
