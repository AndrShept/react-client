import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import { GoldIcon } from './game-icons/GoldIcon';
import { CheckIcon, X } from 'lucide-react';

interface Props {
  children: ReactNode;
  onConfirm: () => void;
  setIsShow?: Dispatch<SetStateAction<boolean>>;
}
interface ConfirmPopoverContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsShow: Dispatch<SetStateAction<boolean>> | undefined;
  onConfirm: () => void;
}

interface ConfirmPopoverCompound {
  Content: React.FC<{ children: ReactNode }>;
  Trigger: React.FC<HTMLAttributes<HTMLButtonElement>>;
  Message: React.FC<HTMLAttributes<HTMLParagraphElement>>;
  Title: React.FC<HTMLAttributes<HTMLParagraphElement>>;
}
const ConfirmPopoverContext = createContext<
  ConfirmPopoverContextProps | undefined
>(undefined);
const useConfirmPopover = () => {
  const context = useContext(ConfirmPopoverContext);
  if (!context) {
    throw new Error('useConfirmPopover context not found');
  }
  return context;
};

export const ConfirmPopover: React.FC<Props> & ConfirmPopoverCompound = ({
  children,
  onConfirm,
  setIsShow,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ConfirmPopoverContext.Provider
      value={{ isOpen, setIsOpen, onConfirm, setIsShow }}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        {children}
      </Popover>
    </ConfirmPopoverContext.Provider>
  );
};
ConfirmPopover.Content = ({ children }) => {
  const { setIsOpen, onConfirm, setIsShow } = useConfirmPopover();

  return (
    <PopoverContent className="text-sm flex flex-col gap-4 ">
      {children}
      <section className="flex gap-1 ml-auto ">
        <Button
          onClick={() => {
            setIsOpen(false);
            setIsShow && setIsShow(false);
          }}
          size={'icon'}
          variant={'outline'}
          className='size-10 hover:text-red-500'
        >
          <X className='size-5 ' />
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            setIsOpen(false);
            setIsShow && setIsShow(false);
          }}
          size={'icon'}
          variant={'secondary'}
          className='size-10 hover:text-green-500'
        >
        <CheckIcon className='size-5' />
        </Button>
      </section>
    </PopoverContent>
  );
};

ConfirmPopover.Title = ({ children, ...props }) => {
  return <p {...props}> {children}</p>;
};
ConfirmPopover.Message = ({ children, ...props }) => {
  return <p {...props}> {children}</p>;
};
ConfirmPopover.Trigger = ({ children, ...props }) => {
  return <PopoverTrigger {...props}>{children}</PopoverTrigger>;
};
