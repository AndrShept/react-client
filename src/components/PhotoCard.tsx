import { useAppSelector } from '@/hooks/store';
import { Photo } from '@/lib/types';
import { compactNumberFormatter } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  EyeIcon,
  HeartIcon,
  MessageCircle,
  MessageCircleIcon,
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LikeIcon } from './icons/LikeIcon';

interface PhotoCardProps {
  photo: Photo;
  username: string;
  idx?: number;
}

export const PhotoCard = ({ photo, username, idx }: PhotoCardProps) => {
  const navigate = useNavigate();

  return (
    <article>
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
          navigate(`?id=${photo.id}`, { state: { mode: 'photo' } })
        }
        className=" flex flex-col max-w-[200px] relative group cursor-pointer   "
      >
        <div className="relative max-w-[200px] min-w-[150px] overflow-hidden cursor-pointer  aspect-square ">
          <img
            loading="lazy"
            className="object-cover  size-full   "
            src={photo.url}
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
      <section className="flex gap-2 text-muted-foreground mt-1 items-center ">
        <div className="flex items-center gap-[3px]">
          <HeartIcon className="size-4 " />
          <p className=" text-muted-foreground text-xs">
            {compactNumberFormatter(photo._count.likes)}
          </p>
        </div>
        <div className="flex items-center gap-[3px]">
          <MessageCircleIcon className="size-4 " />
          <p className=" text-muted-foreground text-xs">
            {compactNumberFormatter(photo._count.comments)}
          </p>
        </div>

        <div className="flex items-center gap-[3px]">
          <EyeIcon className="size-4 " />
          <p className=" text-muted-foreground text-xs">
            {compactNumberFormatter(photo._count.view)}
          </p>
        </div>
      </section>
    </article>
  );
};
