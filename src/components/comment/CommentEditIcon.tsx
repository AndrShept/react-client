import { Edit3Icon } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '../ui/button';

export const CommentEditIcon = ({
  setIsEdit,
}: {
  setIsEdit: (bool: boolean) => void;
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEdit(false);
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [setIsEdit]);
  return (
    <Button
      onClick={() => setIsEdit(true)}
      variant={'ghost'}
      size={'icon'}
      className="size-[23px]"
    >
      <Edit3Icon className="size-[16px]" />
    </Button>
  );
};
