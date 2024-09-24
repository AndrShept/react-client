import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Users2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { UsersBar } from './UsersBar';
import { Button } from './ui/button';

export const UsersBarIcon = () => {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery('(min-width: 1024px)');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        {' '}
        <Button
          className={cn('size-9 ', {
            'lg:hidden flex': !pathname.includes('game'),
          })}
          variant={'ghost'}
          size={'icon'}
        >
          <Users2Icon className="size-[19px]" />
        </Button>
      </SheetTrigger>
      <SheetContent closeIcon={'left'} className="w-fit p-2 pt-10">
        <UsersBar />
      </SheetContent>
    </Sheet>
  );
};
