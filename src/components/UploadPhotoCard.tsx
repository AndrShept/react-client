import { useAppDispatch } from '@/hooks/store';
import { setSelectedPhoto } from '@/lib/redux/photoSlice';
import { cn, convertToMb } from '@/lib/utils';
import { Check } from 'lucide-react';

import { PhotoDetail } from './UploadPhotos';
import { Button } from './ui/button';

interface UploadPhotoCardProps {
  photo: PhotoDetail;
}

export const UploadPhotoCard = ({ photo }: UploadPhotoCardProps) => {
  const dispatch = useAppDispatch();
  return (
    <article
      className="relative flex flex-col      border rounded border-transparent hover:border-primary p-1 hover:cursor-pointer "
      onClick={() => dispatch(setSelectedPhoto(photo.id))}
    >
      <picture className="  md:size-[150px]  size-[140px] ">
        <img
          loading="lazy"
          key={photo.url}
          src={photo.url}
          alt="user-photo"
          className={cn(' transition size-full object-cover  ', {
            'opacity-30': !photo.isSelected,
          })}
        />
      </picture>

      <Button
        className="absolute right-2 top-2 h-5 w-5"
        variant={'secondary'}
        size={'icon'}
      >
        {photo.isSelected && <Check className="size-4 " />}
      </Button>

      <div className="flex flex-col md:w-[150px] w-[140px]">
        <p className="break-all line-clamp-1 text-xs">{photo.name}</p>
        <p className="text-red-500 text-xs">{convertToMb(photo.size)}</p>
      </div>
    </article>
  );
};
