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
      <div className="  h-[70%]  pl-2 py-2 border-r border-y rounded-e-lg  ">
        <ScrollArea className="h-full pr-2">
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
                    {item.label}
                  </span>
                </Button>
              </nav>
            ))}
          </ul>
        </ScrollArea>
      </div>
      <div className="flex-1">
        <ScrollArea className="h-[68%] pr-2.5">
          <ul className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 sm:p-0 px-6 ">
            {shopItems?.map((item) => (
           
                <ItemCardInfo key={item.id} isShowBuyButton={true} item={item} />
            
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
