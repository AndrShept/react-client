import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setPhotos } from '@/lib/redux/photoSlice';
import { CirclePlusIcon } from 'lucide-react';
import React from 'react';

import { UploadPhotoModal } from './UploadPhotoModal';
import { Button } from './ui/button';

export type PhotoDetail = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  url: string;
};

export const UploadPhotos = () => {
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const filesArray = [...files].map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      url: URL.createObjectURL(file),
    }));

    dispatch(setPhotos(filesArray));
  };

  return (
    <>
      <Button asChild variant={'ghost'} className="">
        <label className="cursor-pointer" htmlFor="photo">
          <CirclePlusIcon className="mr-2" />
          Add photos
        </label>
      </Button>
      <input
        onChange={onChange}
        multiple
        hidden
        id="photo"
        type="file"
        accept="image/*"
      />

      <UploadPhotoModal />
    </>
  );
};
