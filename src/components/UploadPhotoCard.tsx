import React from 'react';

import { PhotoDetail } from './UploadPhotos';

interface UploadPhotoCardProps {
  photo: PhotoDetail;
}

export const UploadPhotoCard = ({ photo }: UploadPhotoCardProps) => {
  return (
    <article>
      <figure className="relative h-[100px] w-[100px] ">
        <img
          key={photo.url}
          src={photo.url}
          alt="user-photo"
          className="object-cover size-full "
        />
      </figure>
    </article>
  );
};
