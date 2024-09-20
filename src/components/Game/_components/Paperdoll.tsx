import { useAppSelector } from '@/hooks/store';
import { ItemType } from '@/lib/types/game.types';
import React from 'react';

import { FillBar } from './FillBar';
import { GameItemCard } from './GameItemCard';
import { HeroAvatar } from './HeroAvatar';

export const Paperdoll = () => {
  const hero = useAppSelector((state) => state.hero.hero);
  console.log(hero)
  const equipWeapon = hero?.equipments.find(
    (equip) => equip.gameItem?.type === 'WEAPON',
  );
  console.log(equipWeapon);
  return (
    <section className="  flex flex-col gap-4 border p-6 rounded-xl">
      <div className="flex items-center gap-2 ">
        <div>
          <HeroAvatar src={hero?.avatarUrl} />
        </div>
        <div className="gap-0.5 flex flex-col w-full">
          <p>{hero?.name}</p>
          <FillBar
            value={hero?.modifier.health ?? 0}
            color="green"
            maxValue={hero?.modifier.maxHealth ?? 0}
          />
          <FillBar
            value={hero?.modifier.mana ?? 0}
            color="blue"
            maxValue={hero?.modifier.maxMana ?? 0}
          />
        </div>
      </div>

      <div className=" rounded p-2  flex flex-col max-w-xs py-10">
        <section
          id={ItemType.HELMET}
          className="border relative size-14 mx-auto   "
          style={{
            imageRendering: 'pixelated',
          }}
        >
          <img
            className="size-full object-cover opacity-10 grayscale"
            src="/sprites/icons/helmet.png"
            alt=""
          />

          <div
            id={ItemType.AMULET}
            className="absolute border size-7 bottom-0 -right-10"
          ></div>
        </section>
        <section className="mx-auto mt-4 flex ">
          <div className="space-y-2 mt-2">
            <div id={ItemType.WEAPON} className="border size-14 mt-auto ">
              {!equipWeapon?.gameItem && (
                <img
                  className="size-full object-cover opacity-10 grayscale"
                  src="/sprites/icons/weapon.png"
                  alt=""
                />
              )}
              {equipWeapon?.gameItem && (
                <GameItemCard item={equipWeapon?.gameItem} />
              )}
            </div>
            <div id={ItemType.RING} className="border size-6 ml-auto"></div>
          </div>

          <div
            id={ItemType.BREASTPLATE}
            className="border  w-[70px] h-20 mx-2"
          ></div>
          <div className="space-y-2 mt-2">
            <div id={ItemType.SHIELD} className="border size-14 mt-auto "></div>
            <div id={ItemType.RING} className="border size-6 mr-auto"></div>
          </div>
        </section>
        <section className="mx-auto  flex gap-4   ">
          <div
            id={ItemType.LEGS}
            className="border size-14 mx-auto mt-2 "
          ></div>
          <div id={ItemType.BELT} className="border size-14 h-7 "></div>
          <div
            id={ItemType.LEGS}
            className="border size-14 mx-auto mt-2 "
          ></div>
        </section>
      </div>
      <div className="mt-auto">
        <FillBar
          maxValue={hero?.maxExperience ?? 0}
          value={hero?.currentExperience ?? 0}
          color="violet"
        />
      </div>
    </section>
  );
};
