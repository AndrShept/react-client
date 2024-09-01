import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import { BASE_URL } from '@/lib/constants';
import {
  defaultPage,
  incrementPage,
  setIsShow,
  setMode,
  setPhotos,
} from '@/lib/redux/photoSlice';
import { useGetPhotosByUsernameQuery } from '@/lib/services/photoApi';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

import { PhotoCard } from './PhotoCard';
import { Search } from './Search';
import { LikeIcon } from './icons/LikeIcon';
import { UserProfilePhotosSkeleton } from './skeletons/UserProfilePhotosSkeleton';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const UserProfilePhoto = () => {
  const params = useParams() as { username: string };
  const { username } = useAuth();
  const [isShowName, setIsShowName] = useState(false);
  const isSelf = params.username === username;
  const dispatch = useAppDispatch();

  const page = useAppSelector((state) => state.photo.page);

  const searchValue = useAppSelector(
    (state) => state.search.searchData.searchPhotos,
  );
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const { isLoading, data: photos } = useGetPhotosByUsernameQuery({
    username: params.username,
    page,
    search: searchValue ? searchValue : undefined,
  });

  const onEdit = () => {
    if (!photos) return;
    const changedPhotos = photos?.map((photo) => ({
      id: photo.id,
      name: photo.name,
      url: photo.url,
      size: photo.size,
      isSelected: false,
      createdAt: photo.createdAt,
    }));
    dispatch(setIsShow(true));
    dispatch(setPhotos(changedPhotos));
    dispatch(setMode('edit'));
  };
  const refCount = useRef(photos?.length);
  useEffect(() => {
    if (inView && refCount.current !== photos?.length) {
      setTimeout(() => {
        dispatch(incrementPage());
        refCount.current = photos?.length;
      }, 200);
    }
  }, [inView]);
  return (
    <section className="w-full flex flex-col">
      {!isLoading && !!photos?.length && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="bg-secondary/40 rounded-md  flex md:flex-row flex-col justify-between px-6 py-4 gap-4 items-center "
        >
          <Search
            className="md:w-fit w-full"
            placeholder="search..."
            type="photo"
          />
          <div className="flex items-center gap-4">
            <Label className="flex items-center gap-2 ">
              <p className="text-muted-foreground"> Photo name</p>
              <Input
                onChange={(e) => setIsShowName(e.target.checked)}
                className="size-4"
                type="checkbox"
              />
            </Label>
            {isSelf && (
              <Button
                onClick={onEdit}
                className=""
                size={'sm'}
                variant={'secondary'}
              >
                Edit
              </Button>
            )}
          </div>
        </motion.div>
      )}

      {!isLoading && !!photos?.length && (
        <ul className="grid mt-3 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-1 max-w-fit mx-auto   ">
          <AnimatePresence initial={false}>
            {!isLoading ? (
              photos?.map((photo, idx) => (
                <li key={photo.id} className=" flex flex-col ">
                  <PhotoCard
                    photo={photo}
                    username={params.username}
                    idx={idx}
                  />
                  {isShowName && (
                    <p className="break-all line-clamp-1 text-sm">
                      {photo.name}
                    </p>
                  )}
                </li>
              ))
            ) : (
              <UserProfilePhotosSkeleton />
            )}
          </AnimatePresence>
        </ul>
      )}
      {!isLoading && !photos?.length && (
        <p className="text-muted-foreground text-[15px]  m-auto">
          Photo not found
        </p>
      )}
      <div ref={ref}></div>
    </section>
  );
};
