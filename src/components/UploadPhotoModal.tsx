import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { selectAllPhoto, unSelectAllPhoto } from '@/lib/redux/photoSlice';
import { useEffect, useState } from 'react';

import { UploadPhotoCard } from './UploadPhotoCard';
import { ScrollArea } from './ui/scroll-area';

export const UploadPhotoModal = () => {
  const photos = useAppSelector((state) => state.photo.photos);
  const selectedPhotos = useAppSelector((state) => state.photo.selectedPhotos);
  const dispatch = useAppDispatch();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (!!photos.length) {
      setIsShow(true);
    }

  }, [photos, selectedPhotos]);
  return (
    <div>
      <Dialog open={isShow} onOpenChange={setIsShow}>
        <DialogContent className=" md:w-fit w-[380px]    ">
          <DialogHeader>
            <DialogTitle>Add photos on profile</DialogTitle>
            <DialogDescription>
              Select your photos to add your profile
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className=" h-[55vh]  ">
            <ul className="flex flex-wrap  gap-1 mt-8 ">
              {photos.map((photo) => (
                <UploadPhotoCard key={photo.url} photo={photo} />
              ))}
            </ul>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <div className="mr-auto flex gap-2">
              <Button
                disabled={photos.length === selectedPhotos.length}
                onClick={() => dispatch(selectAllPhoto())}
                size={'icon'}
                className="text-lg"
                variant={'secondary'}
                type="button"
              >
                +
              </Button>
              <Button
                disabled={!selectedPhotos.length}
                onClick={() => dispatch(unSelectAllPhoto())}
                size={'icon'}
                className="text-lg"
                variant={'secondary'}
                type="button"
              >
                -
              </Button>
            </div>

            <Button disabled={!selectedPhotos.length} type="button">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
