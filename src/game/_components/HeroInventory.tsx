import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppSelector } from '@/hooks/store';

import { GameItemCard } from './GameItemCard';

export const HeroInventory = () => {
  const inventorySlots = useAppSelector(
    (state) => state.hero.hero?.inventorySlots,
  );
  const inventorys = useAppSelector(
    (state) => state.hero.hero?.inventorys ?? [],
  );
  return (
    <ScrollArea className="h-full ">
      <ul className="flex flex-wrap gap-1">
        {[...Array(inventorySlots)].map((_, idx) => {
          const inventoryItem = inventorys[idx];

          return (
            <li key={idx} className="size-12 border">
              {inventoryItem ? (
                <GameItemCard
                  isSelected={false}
                  item={inventoryItem.gameItem}
                  inventoryItemId={inventoryItem.id}
                  isEquipped={inventoryItem.isEquipped}
                  isCanEquipped={inventoryItem.isCanEquipped}
                  isDoubleCLick={true}
                  equipmentHeroId={inventoryItem.heroId}
                  isCanDrink={inventoryItem.gameItem.type === 'POTION'}
                  quantity={inventoryItem.quantity}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
};
