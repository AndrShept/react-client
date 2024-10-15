import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setSysMessages } from '@/lib/redux/heroSlice';
import {
  useAddHeroItemInventoryMutation,
  useLazyGetMyHeroQuery,
} from '@/lib/services/game/heroApi';
import { ErrorMessage } from '@/lib/types';
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
  const dispatch = useAppDispatch();
  console.log(gameItemId)
  const onAddHeroItemInventory = async () => {
    try {
      const res = await addHeroItemInventory({ gameItemId }).unwrap();
      console.log(res);
      await refreshMyHero();
      if (res.success) {
        dispatch(setSysMessages({ ...res, createdAt: Date.now() }));
      }
    } catch (error) {
      const err = error as ErrorMessage;
      if (!err.data.success) {
        dispatch(setSysMessages({ ...err.data, createdAt: Date.now() }));
      } else {
        console.log(err);
        toast.error('Something went wrong');
      }
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
