import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

import { gameUrls } from '../GameNavbar';

interface Props {
  buttonClassName?: string;
  iconClassName?: string;
}

export const ShopButton = ({ buttonClassName, iconClassName }: Props) => {
  const { pathname } = useLocation();
  return (
    <Button
      className={cn(buttonClassName)}
      variant={pathname.includes(gameUrls.shop) ? 'secondary' : 'outline'}
      size={'icon'}
    >
      <img
        className={cn('size-8', iconClassName)}
        src="/sprites/icons/shop.png"
        alt="ShopGameIcon"
      />
    </Button>
  );
};
