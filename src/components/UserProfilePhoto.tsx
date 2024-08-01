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
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

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
    threshold: 0,
    triggerOnce: true,
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
      url: BASE_URL + photo.url,
      size: photo.size,
      isSelected: false,
      createdAt: photo.createdAt,
    }));
    dispatch(setIsShow(true));
    dispatch(setPhotos(changedPhotos));
    dispatch(setMode('edit'));
  };
  useEffect(() => {
    if (inView) {
      dispatch(incrementPage());
    }
    return () => {
      dispatch(defaultPage());
    };
  }, [inView]);

  if (isLoading) {
    return <UserProfilePhotosSkeleton />;
  }

  // if (!isLoading && !photos?.length) {
  //   return (
  <p className="text-muted-foreground text-[15px]  m-auto">Photo not found</p>;
  //   );
  // }

  return (
    <section className="flex flex-col gap-4">
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
      <ul className="flex flex-wrap gap-1 w-full  ">
        {!isLoading && !photos?.length && (
          <p className="text-muted-foreground text-[15px]  m-auto">
            Photo not found
          </p>
        )}
        <AnimatePresence initial={false}>
          {photos?.map((photo, idx) => (
            <li key={photo.id} className="flex-1 flex flex-col">
              <motion.article
                // initial={{ opacity: 0, scale: 0.5 }}
                // animate={{ opacity: 1, scale: 1 }}
                // exit={{ opacity: 0, scale: 0.5 }}
                // transition={{
                //   duration: 0.5,
                //   delay: 0.1 * idx,
                //   ease: 'anticipate',
                // }}
                className="flex-1 flex flex-col max-w-[200px] relative group    "
              >
                <div className="relative max-w-[200px] min-w-[150px] overflow-hidden cursor-pointer  aspect-square ">
                  <img
                    loading="lazy"
                    className="object-cover  size-full   "
                    src={`${BASE_URL}${photo.url}`}
                  />
                  {/* <div className="size-full bg-secondary"></div> */}
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
      <div className="bg-primary text-muted-foreground opacity-0" ref={ref} />
    </section>
  );
};
