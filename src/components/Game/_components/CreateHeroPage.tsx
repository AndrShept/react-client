import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetNoviceItemsQuery } from '@/lib/services/game/ItemApi';
import {
  useCreateHeroMutation,
  useGetMyHeroQuery,
} from '@/lib/services/game/heroApi';
import { ErrorMessage } from '@/lib/types';
import { InventoryItem } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import { color } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Background } from './Background';
import { HeroAvatarList } from './HeroAvatarList';
import { HeroStatsBlock } from './HeroStatsBlock';
import { InventoryItemCard } from './InventoryItemCard';

export interface IStats {
  name: string;
  value: number;
  baseValue: number;
  color: string;
}

export const CreateHeroPage = () => {
  const { data: hero } = useGetMyHeroQuery();
  const [nickname, setNickname] = useState('');
  const [stats, setStats] = useState([
    {
      name: 'Strength',
      value: 10,
      baseValue: 10,
      color: 'text-red-500',
    },
    {
      name: 'Dexterity',
      value: 10,
      baseValue: 10,
      color: 'text-green-500',
    },
    {
      name: 'Intelligence',
      value: 10,
      baseValue: 10,
      color: `text-sky-500`,
    },
    {
      name: 'Constitution',
      value: 10,
      baseValue: 10,
      color: 'text-stone-500',
    },
    {
      name: 'Luck',
      value: 5,
      baseValue: 5,
      color: 'text-purple-500',
    },
  ]);
  const [heroWeapon, setHeroWeapon] = useState<null | InventoryItem>(null);
  const [heroArmor, setHeroArmor] = useState<null | InventoryItem>(null);
  const [statPoints, setStatPoints] = useState({
    value: 10,
    baseValue: 10,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { data: items, isLoading, isError } = useGetNoviceItemsQuery();
  const armors = items?.filter((item) => item.type === 'BREASTPLATE');
  const weapons = items?.filter((item) => item.type === 'WEAPON');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();
  const [createHero, { isLoading: isLoadingCreateHero }] =
    useCreateHeroMutation();
  const onCreateHero = async () => {
    if (nickname.length < 3) {
      setErrorMessage('The nickname must be longer than 3 characters');
      return;
    }
    if (nickname.length > 15) {
      setErrorMessage('The nickname must be no more than 15 characters long.');
      return;
    }
    if (!avatar) {
      setErrorMessage('Select hero avatar');
      return;
    }
    if (!heroWeapon) {
      setErrorMessage('Select hero weapon');
      return;
    }
    if (!heroArmor) {
      setErrorMessage('Select hero armor');
      return;
    }
    const name = nickname;
    const statPoint = statPoints.value;
    const newStat = stats.reduce((acc: any, item) => {
      acc[item.name.toLowerCase()] = item.value;
      return acc;
    }, {});

    try {
      const res = await createHero({
        name,
        statPoint,
        modifier: newStat,
        breastplate: heroArmor,
        weapon: heroWeapon,
      }).unwrap();
      if (res) {
        navigate('/game');
      }
    } catch (error) {
      const err = error as ErrorMessage;
      if (err.data.message) {
        setErrorMessage(err.data.message);
      }
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (hero) {
      navigate('/game');
    }
  }, [hero]);

  return (
    <Background imageUrl="/sprites/shrine6.png">
      <Button asChild variant={'outline'} className="">
        <Link to={'/create-item'}>GOGOG</Link>
      </Button>
      <div className="  flex bg-black/70 border  backdrop-blur-md rounded-lg     md:flex-row flex-col  md:p-10 p-4 max-w-5xl m-auto text-[15px] gap-4 ">
        <div className="mx-auto">
          <HeroAvatarList avatar={avatar} setAvatar={setAvatar} />
        </div>

        <div className="flex flex-col gap-4 mx-auto max-w-[220px]">
          <label htmlFor="input">
            nickname
            <Input
              className="mt-0.5"
              value={nickname}
              onChange={(e) => setNickname(e.target.value.trimStart())}
              id="input"
            />
          </label>
          {errorMessage && <p className="text-rose-500">{errorMessage} </p>}
          <HeroStatsBlock
            setStatPoints={setStatPoints}
            setStats={setStats}
            statPoints={statPoints}
            stats={stats}
          />
          <Button
            disabled={isLoadingCreateHero}
            variant={'secondary'}
            onClick={onCreateHero}
          >
            {isLoadingCreateHero ? 'Creating... ' : 'Create Hero'}
          </Button>
        </div>

        <div className="border p-4 rounded-lg flex">
          <div className="flex flex-col">
            <h5 className="text-xl text-primary mb-2 ">
              Chose your start inventory:
            </h5>
            {isLoading && (
              <p className="m-auto">
                <Spinner /> loading...
              </p>
            )}
            {!isLoading && (
              <div className="flex flex-col gap-4 ">
                <div className="flex gap-2 flex-wrap">
                  <p className="w-16">Weapon</p>
                  <ul className="flex gap-2">
                    {weapons?.map((weapon) => (
                      <InventoryItemCard
                        setHeroItem={() => setHeroWeapon(weapon)}
                        item={weapon}
                        isSelected={weapon.id === heroWeapon?.id}
                      />
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <p className="w-16">Armor</p>
                  <ul className="flex gap-2">
                    {armors?.map((armor) => (
                      <InventoryItemCard
                        setHeroItem={() => setHeroArmor(armor)}
                        item={armor}
                        isSelected={armor.id === heroArmor?.id}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Background>
  );
};
