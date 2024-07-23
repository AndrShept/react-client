import { BASE_URL } from '@/lib/constants';
import { useGetPhotosByUsernameQuery } from '@/lib/services/photoApi';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Search } from './Search';
import { LikeIcon } from './icons/LikeIcon';
import { UserProfilePhotosSkeleton } from './skeletons/UserProfilePhotosSkeleton';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const UserProfilePhoto = () => {
  const { username } = useParams();
  const [isShowName, setIsShowName] = useState(false);
  const { isLoading, data: photos } = useGetPhotosByUsernameQuery(
    username as string,
  );
  console.log(photos);
  if (isLoading) {
    return <UserProfilePhotosSkeleton />;
  }
  if (!isLoading && !photos?.length) {
    return (
      <p className="text-muted-foreground text-[15px]  m-auto">
        Photo not found
      </p>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="bg-secondary/40 rounded-md  flex justify-between px-6 py-4 ">
        <Search className="" placeholder="search..." type="photo" />
        <div className="flex items-center gap-4">
          <Label className="flex items-center gap-2 ">
            <p className="text-muted-foreground"> Photo name</p>
            <Input
              onChange={(e) => setIsShowName(e.target.checked)}
              className="size-4"
              type="checkbox"
            />

          </Label>
          <Label className="flex items-center gap-2 ">
            <p className="text-muted-foreground"> Edit Mode</p>
            <Input className="size-4" type="checkbox" />
          </Label>
        </div>
      </div>
      <ul className="flex flex-wrap gap-1   ">
        <AnimatePresence initial={true}>
          {photos?.map((photo, idx) => (
            <li className="flex-1 flex flex-col">
              <motion.article
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 * idx,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                key={photo.id}
                className="flex-1 flex flex-col max-w-[200px] relative group   "
              >
                <div className="relative max-w-[200px] min-w-[150px] overflow-hidden cursor-pointer  aspect-square ">
                  <img
                    loading="lazy"
                    className="object-cover  size-full   "
                    src={`${BASE_URL}${photo.url}`}
                  />
                </div>
                <div className="absolute flex items-center justify-center inset-0 bg-black/70 opacity-0 hover:opacity-100 transition-all  border">
                  <LikeIcon
                    likedByUser={photo.likedByUser}
                    id={photo.id}
                    photoId={photo.id}
                    likeCount={photo._count.likes}
                    type="photo"
                    icon="heart"
                    color="red"
                    username={username}
                  />
                </div>
              </motion.article>
              {isShowName && (
                <p className="break-all line-clamp-1 text-sm">{photo.name}</p>
              )}
            </li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
};
