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
import { useAuth } from '@/hooks/useAuth';
import {
  resetState,
  selectAllPhoto,
  setIsShow,
  unSelectAllPhoto,
} from '@/lib/redux/photoSlice';
import {
  useAddPhotosMutation,
  useDeletePhotosMutation,
  useLazyGetPhotosByUsernameQuery,
} from '@/lib/services/photoApi';
import { LucideSearch } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Search } from './Search';
import { UploadPhotoCard } from './UploadPhotoCard';
import { PhotoDetail } from './UploadPhotos';
import { SelectedButton } from './ui/custom-button/SelectedButton';
import { ScrollArea } from './ui/scroll-area';

interface UploadPhotoModalProps {
  files: File[];
  setFiles: (arr: File[]) => void;
}
export const UploadPhotoModal = ({
  files,
  setFiles,
}: UploadPhotoModalProps) => {
  const { username } = useAuth();
  const [addPhotos, { isLoading }] = useAddPhotosMutation();
  const [formData, setFormData] = useState(new FormData());
  const [refetchPhotos] = useLazyGetPhotosByUsernameQuery();
  const [deletePhotos, { isLoading: isLoadingDeletePhotos }] =
    useDeletePhotosMutation();
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.photo.mode);
  const isShow = useAppSelector((state) => state.photo.isShow);
  const searchValue = useAppSelector(
    (state) => state.search.searchData.searchPhotosModal,
  );
  const page = useAppSelector((state) => state.photo.page);
  const photos = useAppSelector((state) =>
    state.photo.photos.filter((photo) =>
      photo.name
        .toLocaleLowerCase()
        .includes(searchValue?.toLocaleLowerCase() ?? ''),
    ),
  );
  const selectedPhotos = useMemo<PhotoDetail[]>(() => {
    return photos.filter((photo) => photo.isSelected);
  }, [photos]);
  const createPhotos = async () => {
    selectedPhotos.forEach((item) => {
      files.forEach((file) => {
        if (item.name === file.name) {
          formData.append('files', file);
        }
      });
    });

    try {
      const res = await addPhotos(formData).unwrap();
      setFiles([]);
      setFormData(new FormData());
      if (res.count >= 1) {
        dispatch(setIsShow(false));
        toast.success(
          `${res.count === 1 ? 'Photo success added' : `Photos success added ${res.count} count `}`,
        );
        await refetchPhotos({ username: username as string, page }).unwrap();
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  const onDelete = async () => {
    try {
      const res = await deletePhotos(selectedPhotos).unwrap();
      if (res.count >= 1) {
        toast.success(
          `${res.count === 1 ? 'Photo success delete' : `Photos success deleted ${res.count} count `}`,
        );
        dispatch(setIsShow(false));
        await refetchPhotos({ username: username as string, page }).unwrap();
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      <Dialog open={isShow} onOpenChange={() => dispatch(setIsShow(false))}>
        <DialogContent className=" md:w-fit w-[380px] flex flex-col md:min-w-[430px]    ">
          <DialogHeader>
            <DialogTitle>
              {mode === 'add' && <p>Add photos on profile</p>}
              {mode === 'edit' && <p>Select your photos to edit</p>}
            </DialogTitle>
            <DialogDescription>
              {mode === 'add' && <p>Select your photos to add your profile</p>}
              {mode === 'edit' && <p></p>}
            </DialogDescription>

            <div className="py-4 ">
              <Search placeholder="search..." type="photoModal" />
            </div>
          </DialogHeader>

          {searchValue && !photos.length && (
            <div className=" h-[55vh] flex text-muted-foreground  text-sm  ">
              <div className="flex flex-col items-center gap-2 m-auto">
                <LucideSearch className="text-primary  size-8" />
                <p className=" ">not found photo...</p>
              </div>
            </div>
          )}

          {!!photos.length && (
            <ScrollArea className=" h-[55vh]     ">
              <ul className="flex flex-wrap  gap-1 mt-4 ">
                {photos.map((photo) => (
                  <UploadPhotoCard key={photo.url} photo={photo} />
                ))}
              </ul>
            </ScrollArea>
          )}

          <DialogFooter className="mt-4 flex flex-row">
            <div className=" mr-auto flex gap-2 items-center">
              {photos.length > 2 && (
                <div className="flex gap-2">
                  <SelectedButton
                    disabled={!selectedPhotos.length || isLoading}
                    onClick={() => dispatch(unSelectAllPhoto())}
                  >
                    -
                  </SelectedButton>

                  <SelectedButton
                    disabled={
                      photos.length === selectedPhotos.length || isLoading
                    }
                    onClick={() => dispatch(selectAllPhoto())}
                  >
                    +
                  </SelectedButton>
                </div>
              )}
              <p className="text-muted-foreground text-sm">
                Selected
                <span className="text-green-600 m-1">
                  {selectedPhotos.length}
                </span>
                items
              </p>
            </div>

            {mode === 'add' && (
              <Button
                onClick={createPhotos}
                disabled={!selectedPhotos.length || isLoading}
                type="button"
              >
                Save
              </Button>
            )}
            {mode === 'edit' && (
              <Button
                onClick={onDelete}
                disabled={
                  !selectedPhotos.length || isLoading || isLoadingDeletePhotos
                }
                type="button"
                variant={'destructive'}
              >
                Delete
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
