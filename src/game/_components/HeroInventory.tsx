import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppSelector } from '@/hooks/store';

import { GameItemCard } from './GameItemCard';

export const HeroInventory = () => {
  const hero = useAppSelector((state) => state.hero.hero);
  return (
    <ScrollArea className="h-full ">
      <ul className="flex flex-wrap gap-1">
        {[...Array(hero?.inventorySlots)].map((_, idx) => {
          const inventoryItem = hero?.inventorys[idx];

          return (
            <li key={idx} className="size-12 border">
              {inventoryItem ? (
                <GameItemCard
                  isSelected={false}
                  item={inventoryItem.gameItem}
                  inventoryItemId={inventoryItem.id}
                  isEquipped={inventoryItem.isEquipped}
                  isCanEquipped = {inventoryItem.isCanEquipped}
                  isDoubleCLick={true}
                  equipmentHeroId={inventoryItem.heroId}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
};
