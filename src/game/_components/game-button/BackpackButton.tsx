import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

import { gameUrls } from '../GameNavbar';
import { BackpackIcon } from '../game-icons/BackpackIcon';

interface Props {
  inventorysLength?: number;
  inventorySlots?: number;
}

export const BackpackButton = ({ inventorySlots, inventorysLength }: Props) => {
  const { pathname } = useLocation();
  return (
    <Button
      className="relative"
      variant={pathname.includes(gameUrls.inventory) ? 'secondary' : 'outline'}
      size={'icon'}
    >
      <BackpackIcon />
      {!!inventorySlots && inventorysLength && (
        <div className="absolute text-[10px] -bottom-1">
          {inventorysLength}/{inventorySlots}
        </div>
      )}
    </Button>
  );
};
