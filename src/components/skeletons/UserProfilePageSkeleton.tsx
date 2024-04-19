import React from 'react';

import { Skeleton } from '../ui/skeleton';

export const UserProfilePageSkeleton = () => {
  return (
    <section className="flex flex-col ">
      <div className="h-[100px] "></div>
      <div className="flex flex-col bg-secondary/30  rounded-3xl min-h-[300px]  gap-6  md:p-12 p-6  ">
        <div className="flex justify-between items-center relative">
          <div>
            <Skeleton className="w-24 h-9 rounded-full" />
          </div>
          <div className="absolute z-[-1] inset-0 flex  items-center justify-center -top-[134px]   ">
            <Skeleton className="h-40 w-40 rounded-full" />
          </div>
          <div>
            <Skeleton className="w-24 h-9 rounded-full" />
          </div>
        </div>
        <div className="max-w-xs  flex flex-col items-center justify-between mx-auto gap-2">
          <Skeleton className="w-40 h-10 rounded-full" />
          <Skeleton className="w-20 h-6 rounded-full" />
          <div className="mt-10 space-y-2 flex flex-col ">
            <Skeleton className="w-[300px] h-4 rounded-full" />
            <Skeleton className="w-[200px] h-4 rounded-full" />
            <Skeleton className="w-[160px] h-3 rounded-full" />
            <Skeleton className="w-[285px] h-4 rounded-full" />
            <Skeleton className="w-[160px] h-3 rounded-full" />
          </div>
          <div className=" flex gap-12 mt-7">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-3 h-3 " />
              <Skeleton className="w-10 h-4 " />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-3 h-3 " />
              <Skeleton className="w-10 h-4 " />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-3 h-3 " />
              <Skeleton className="w-10 h-4 " />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-3 h-3 " />
              <Skeleton className="w-10 h-4 " />
            </div>
            {/* <Skeleton className="w-12 h-12 " />
            <Skeleton className="w-12 h-12 " />
            <Skeleton className="w-12 h-12 " />
            <Skeleton className="w-12 h-12 " /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
