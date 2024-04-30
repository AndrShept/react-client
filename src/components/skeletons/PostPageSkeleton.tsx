import { Skeleton } from '../ui/skeleton';

export const PostPageSkeleton = () => {
  return (
    <ul className="flex flex-col gap-4 w-full max-w-[600px] mx-auto mt-4 ">
      {[...Array(1)].map((_, idx) => (
        <li key={idx} className="flex flex-col gap-2">
          <section className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <Skeleton className="h-[40px] w-[40px] rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-[12px] w-[45px] rounded-full" />
                <Skeleton className="h-[12px] w-[90px] rounded-full" />
              </div>
            </div>
            <div className="flex gap-x-1">
              <Skeleton className="rounded-[4px] size-5" />
              <Skeleton className="rounded-[4px] size-5" />
            </div>
          </section>

          <Skeleton className="h-[14px] w-[120px] rounded-full mt-2" />
          <Skeleton className="h-[14px] w-[190px] rounded-full " />

          <Skeleton className="aspect-video  rounded-2xl mt-2" />
          <Skeleton className="h-[14px] w-[120px] rounded-full  mt-1" />
          <Skeleton className="h-[21px] w-[80px] rounded-full  " />
        </li>
      ))}
    </ul>
  );
};
