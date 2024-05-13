import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { Button } from './ui/button';

interface EmojiPickerProps {
  onChange: (emoji: string) => void;
  isLoading: boolean;
  sideOffset: number;
  classname?: string;
}

export const EmojiButton = ({
  onChange,
  isLoading,
  sideOffset,
  classname,
}: EmojiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          disabled={isLoading}
          className={cn(
            'absolute  right-14  rounded-full h-[20px] w-[20px] opacity-80 hover:opacity-100 transition ',
            classname,
          )}
          size={'icon'}
        >
          <img src={`../public/smile.png`} alt="smile-image" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-transparent border-none shadow-none drop-shadow-none mb-10"
        side="right"
        sideOffset={sideOffset}
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          theme={'dark'}
        />
      </PopoverContent>
    </Popover>
  );
};
