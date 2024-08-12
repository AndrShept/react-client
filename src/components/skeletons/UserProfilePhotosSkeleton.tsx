import { Skeleton } from '../ui/skeleton';

export const UserProfilePhotosSkeleton = () => {
  return (
    <>
      {[...Array(8)].map((_, idx) => (
        <div key={idx} className="w-[150px] aspect-square flex-1    ">
          <Skeleton className="  size-full aspect-square    " />
        </div>
      ))}
    </>
  );
};
