import React from 'react';

import { Skeleton } from '../ui/skeleton';

export const UserProfilePhotosSkeleton = () => {
  return (
    <ul className="flex flex-wrap gap-1  ">
      {[...Array(7)].map((_, idx) => (
        <article key={idx} className="flex-1 max-w-[200px]   ">
          <div className="relative max-w-[200px] min-w-[150px] overflow-hidden cursor-pointer  aspect-square ">
            <Skeleton className="object-cover  size-full hover:scale-110 transition will-change-transform   " />
          </div>
        </article>
      ))}
    </ul>
  );
};
