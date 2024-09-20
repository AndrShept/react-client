import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/store';
import { useGetAllItemsQuery } from '@/lib/services/game/ItemApi';
import { useMediaQuery } from 'usehooks-ts';
import { shopNavList } from '../utils';


export const ShopPage = () => {
  const hero = useAppSelector((state) => state.hero.hero);
  const { data: gameItems, isLoading } = useGetAllItemsQuery();
  const isMobile = useMediaQuery('(min-width: 768px)');

  return (
    <section className="flex">
      <div className=" top-0 mt-8 sticky  px-2 py-4 border-r border-y rounded-e-lg  ">
        <ul className="flex flex-col  ">
          {shopNavList.map((item) => (
            <nav>
              <Button
                className="md:w-full w-fit md:justify-start  size-10"
                variant={'ghost'}
                size={!isMobile ? 'icon' : 'default'}
              >
                <div>
                  <img
                    className="size-full"
                    src={`/sprites/icons/shop/${item.label}.png`}
                    alt={`${item.label}-image`}
                  />
                </div>
                <span className="md:inline hidden capitalize ml-1 ">
                  {item.label + 's'}
                </span>
              </Button>
            </nav>
          ))}
        </ul>
      </div>
      <div></div>
    </section>
  );
};
