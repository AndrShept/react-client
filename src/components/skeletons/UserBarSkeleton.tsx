import { Skeleton } from '../ui/skeleton';

export const UserBarSkeleton = () => {
  return (
    <ul className="flex flex-col gap-4 px-4 py-2 w-full ">
      {[...Array(6)].map((_, idx) => (
        <li className="flex items-center justify-between " key={idx}>
          <section className="flex items-center gap-2">
            <Skeleton className="h-[42px] w-[42px] rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-[12px] w-[54px] rounded-full" />
              <Skeleton className="h-[12px] w-[40px] rounded-full" />
            </div>
          </section>

          <Skeleton className="rounded-full h-[34px] w-[57px]" />
        </li>
      ))}
    </ul>
  );
};
