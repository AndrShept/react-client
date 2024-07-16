import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppSelector } from '@/hooks/store';
import { useEffect, useState } from 'react';

import { UploadPhotoCard } from './UploadPhotoCard';
import { ScrollArea } from './ui/scroll-area';

export const UploadPhotoModal = () => {
  const photos = useAppSelector((state) => state.photo.photos);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (!!photos.length) {
      setIsShow(true);
    }
  }, [photos]);
  return (
    <div>
      <Dialog open={isShow} onOpenChange={setIsShow}>
        <DialogContent className=" md:w-fit w-[380px]   ">
          <DialogHeader>
            <DialogTitle>Add photos on profile</DialogTitle>
            <DialogDescription>
              Select your photos to add your profile
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="pr-1 h-[50vh] ">
            <ul className="flex flex-wrap gap-2 mt-8 ">
              {photos.map((photo) => (
                <UploadPhotoCard key={photo.url} photo={photo} />
              ))}
            </ul>
          </ScrollArea>

          <DialogFooter>
            <Button type="submit">Save photos</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
