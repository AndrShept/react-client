import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppSelector } from '@/hooks/store';
import { useGetAllItemsQuery } from '@/lib/services/game/ItemApi';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { shopNavList } from '../../utils';
import { HeroInventory } from '../HeroInventory';
import { ItemCardInfo } from '../ItemCardInfo';

export const ShopPage = () => {
  const [filterType, setFilterType] = useState('sword');
  const shopItems = useAppSelector((state) =>
    state.gameItem.shopItems?.filter(
      (shopItem) => shopItem.type.toLowerCase() === filterType.toLowerCase(),
    ),
  );
  const { data: gameItems, isLoading, isError } = useGetAllItemsQuery();
  const isMobile = useMediaQuery('(min-width: 768px)');


  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <p>Error loading data</p>;
  }
  return (
    <section className="flex  gap-4 mt-8 h-[calc(100vh-152px)]">
      <div className="   h-fit  px-2 py-4 border-r border-y rounded-e-lg  ">
        <ul className="flex  flex-col   ">
          {shopNavList.map((item) => (
            <nav key={item.id}>
              <Button
                onClick={() => setFilterType(item.label)}
                className="md:w-full md:justify-start  size-10"
                variant={item.label === filterType ? 'secondary' : 'ghost'}
                size={!isMobile ? 'icon' : 'default'}
              >
                <img
                  className=""
                  src={`/sprites/icons/shop/${item.label}.png`}
                  alt={`${item.label}-image`}
                />

                <span className="md:inline-block text-[13px] hidden capitalize ml-1  ">
                  {item.label + 's'}
                </span>
              </Button>
            </nav>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <ScrollArea className="h-[99%] pr-2.5">
          <ul className="flex sm:flex-row flex-col gap-3">
            {shopItems?.map((item) => (
              <ItemCardInfo isShowBuyButton={true} item={item} />
            ))}
          </ul>
        </ScrollArea>
      </div>
      <div className="md:w-[300px] w-[200px] lg:block hidden">
        <HeroInventory />
      </div>
    </section>
  );
};
