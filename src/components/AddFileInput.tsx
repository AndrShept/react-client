import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ImagePlusIcon, PlusIcon } from 'lucide-react';

import { Button } from './ui/button';

interface AddFileInputProps {
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isLoading: boolean;
}

export const AddFileInput = ({
  handleUpload,
  isLoading,
}: AddFileInputProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          disabled={isLoading}
          className="mr-2 rounded-full size-9"
          variant={'ghost'}
          size={'icon'}
        >
          <PlusIcon className="size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Button disabled={isLoading} variant={'ghost'} asChild>
          <label className="flex items-center" htmlFor="image">
            <input
              hidden
              onChange={handleUpload}
              id="image"
              type="file"
              accept="image/*"
            />
            <ImagePlusIcon className="mr-2 size-5" />
            Image
          </label>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
