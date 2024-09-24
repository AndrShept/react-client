import { Button } from '@/components/ui/button';
import {
  useAddHeroItemInventoryMutation,
  useLazyGetMyHeroQuery,
} from '@/lib/services/game/heroApi';
import React from 'react';
import { toast } from 'sonner';

interface Props {
  isLabel?: boolean;
  gameItemId: string;
}

export const BuyIcon = ({ isLabel = true, gameItemId }: Props) => {
  const [addHeroItemInventory, { isLoading }] =
    useAddHeroItemInventoryMutation();
  const [refreshMyHero] = useLazyGetMyHeroQuery();

  const onAddHeroItemInventory = async () => {
    try {
      await addHeroItemInventory({ gameItemId }).unwrap();
      await refreshMyHero();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Button
      disabled={isLoading}
      onClick={onAddHeroItemInventory}
      size={!isLabel ? 'icon' : 'default'}
      variant={'secondary'}
    >
      <img
        className="size-6"
        src={'/sprites/icons/shop/buy.png'}
        alt="buy-image"
      />
      {isLabel && <span className="text-[13px] ml-0.5">buy</span>}
    </Button>
  );
};
