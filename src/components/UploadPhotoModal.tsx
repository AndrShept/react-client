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
import {
  resetState,
  selectAllPhoto,
  unSelectAllPhoto,
} from '@/lib/redux/photoSlice';
import { useAddPhotosMutation } from '@/lib/services/photoApi';
import { useEffect, useLayoutEffect, useState } from 'react';
import { toast } from 'sonner';

import { UploadPhotoCard } from './UploadPhotoCard';
import { ScrollArea } from './ui/scroll-area';

export const UploadPhotoModal = () => {
  const [addPhotos, { isLoading }] = useAddPhotosMutation();
  const photos = useAppSelector((state) => state.photo.photos);
  const selectedPhotos = useAppSelector((state) => state.photo.selectedPhotos);

  const dispatch = useAppDispatch();
  const [isShow, setIsShow] = useState(false);

  const createPhotos = async () => {
    const formData = new FormData();
    selectedPhotos.forEach((item) => formData.append('files', item.file));
    try {
      const res = await addPhotos(formData).unwrap();
      if (res.count >= 1) {
        setIsShow(false);
        toast.success(
          `${res.count === 1 ? 'Photo success added' : `Photos success added ${res.count} count `}`,
        );
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (!!photos.length) {
      setIsShow(true);
    }
    return () => setIsShow(false);
  }, [photos, selectedPhotos]);
  useLayoutEffect(() => {
    dispatch(resetState());
  }, []);
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

          <DialogFooter className="mt-4 flex flex-row">
            {photos.length > 2 && (
              <div className="mr-auto flex gap-2">
                <Button
                  disabled={!selectedPhotos.length || isLoading}
                  onClick={() => dispatch(unSelectAllPhoto())}
                  size={'icon'}
                  className="text-lg"
                  variant={'secondary'}
                  type="button"
                >
                  -
                </Button>
                <Button
                  disabled={
                    photos.length === selectedPhotos.length || isLoading
                  }
                  onClick={() => dispatch(selectAllPhoto())}
                  size={'icon'}
                  className="text-lg"
                  variant={'secondary'}
                  type="button"
                >
                  +
                </Button>
              </div>
            )}

            <Button
              onClick={createPhotos}
              disabled={!selectedPhotos.length || isLoading}
              type="button"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
