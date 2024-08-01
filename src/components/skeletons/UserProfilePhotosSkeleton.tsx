import { Skeleton } from '../ui/skeleton';

export const UserProfilePhotosSkeleton = () => {
  return (
    <ul className="grid grid-cols-2 gap-1 mx-auto sm:grid-cols-3 md:grid-cols-4  max-w-fit  ">
      {[...Array(8)].map((_, idx) => (
        <div key={idx} className="w-[150px] aspect-square    ">
          <Skeleton className="  size-full aspect-square   " />
        </div>
      ))}
    </ul>
  );
};
