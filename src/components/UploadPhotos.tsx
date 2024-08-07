import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setIsShow, setMode, setPhotos } from '@/lib/redux/photoSlice';
import { CirclePlusIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { UploadPhotoModal } from './UploadPhotoModal';
import { Button } from './ui/button';

export type PhotoDetail = {
  id: string;
  name: string;
  size: number;
  type?: string;
  lastModified?: number;
  url: string;
  isSelected: boolean;
  file?: FormData;
  createdAt?: Date;
};

export const UploadPhotos = () => {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>([]);
  const photos = useAppSelector((state) => state.photo.photos);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const filesArray = [...files].map((file) => {
      setFiles((prev) => [...prev, file]);
      return {
        id: uuidv4(),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        url: URL.createObjectURL(file),
        isSelected: true,
      };
    });
    if (!!filesArray.length) {
      dispatch(setPhotos(filesArray));
      dispatch(setIsShow(true));
      dispatch(setMode('add'));
    }
  };
  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, [photos]);

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

      <UploadPhotoModal files={files} setFiles={setFiles} />
    </>
  );
};
