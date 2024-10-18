import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppSelector } from '@/hooks/store';

import { GameItemCard } from './GameItemCard';

export const HeroInventory = () => {
  const inventorySlots = useAppSelector(
    (state) => state.hero.hero?.inventorySlots,
  );
  const inventorys = useAppSelector(
    (state) =>
      state.hero.hero?.inventorys.filter((item) => !item.isEquipped) ?? [],
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
                  inventoryItem={inventoryItem}
                  inventoryItemId={inventoryItem.id}
                  isDoubleCLick={true}
                  isCanDrink={inventoryItem.gameItem.type === 'POTION'}
                  isCanEquipped={
                    inventoryItem.gameItem.type !== 'POTION' &&
                    inventoryItem.gameItem.type !== 'MISC'
                  }
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
};
