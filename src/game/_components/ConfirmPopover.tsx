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

interface Props {
  children: ReactNode;
  onConfirm: () => void;
}
interface ConfirmPopoverContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}

interface ConfirmPopoverCompound {
  Content: React.FC<{ children: ReactNode }>;
  Trigger: React.FC<{ children: ReactNode }>;
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ConfirmPopoverContext.Provider value={{ isOpen, setIsOpen, onConfirm }}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        {children}
      </Popover>
    </ConfirmPopoverContext.Provider>
  );
};
ConfirmPopover.Content = ({ children }) => {
  const { setIsOpen, onConfirm } = useConfirmPopover();

  return (
    <PopoverContent className="text-sm flex flex-col gap-4 ">
      {children}
      <section className="flex gap-1 ml-auto ">
        <Button
          onClick={() => setIsOpen(false)}
          size={'sm'}
          variant={'outline'}
        >
          CANCEL
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            setIsOpen(false);
          }}
          size={'sm'}
          variant={'secondary'}
        >
          OK
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
ConfirmPopover.Trigger = ({ children }) => {
  return <PopoverTrigger>{children}</PopoverTrigger>;
};
