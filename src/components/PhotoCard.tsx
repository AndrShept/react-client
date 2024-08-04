import { BASE_URL } from '@/lib/constants';
import { Photo } from '@/lib/types';
import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LikeIcon } from './icons/LikeIcon';

interface PhotoCardProps {
  photo: Photo;
  username: string;
}

export const PhotoCard = ({ photo, username }: PhotoCardProps) => {
  const navigate = useNavigate();
  return (
    <motion.article
      // initial={{ opacity: 0, scale: 0.5 }}
      // animate={{ opacity: 1, scale: 1 }}
      // exit={{ opacity: 0, scale: 0.5 }}
      // transition={{
      //   duration: 0.5,
      //   delay: 0.1 * idx,
      //   ease: 'anticipate',
      // }}
      onClick={() =>
        navigate(`?id=${photo.id}`, { state: { mode: 'open' } })
      }
      className=" flex flex-col max-w-[200px] relative group    "
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
  );
};
