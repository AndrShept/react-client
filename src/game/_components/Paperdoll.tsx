import { EquipmentSlot, Hero } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';

import { equipmentsHeroList } from '../utils';
import { FillBar } from './FillBar';
import { GameItemCard } from './GameItemCard';
import { HeroEquipments } from './HeroEquipments';
import { HeroStatus } from './HeroStatus';

interface Props {
  hero: Hero;
}

export const Paperdoll = ({ hero }: Props) => {
  console.log(hero);

  return (
    <section className="flex flex-col gap-6 border p-6 rounded-xl min-w-[240px] h-fit">
      <HeroStatus
        avatarUrl={hero.avatarUrl}
        health={hero.modifier.health}
        maxHealth={hero.modifier.maxHealth}
        mana={hero.modifier.mana}
        maxMana={hero.modifier.maxMana}
        name={hero.name}
      />

      <HeroEquipments equipments={hero.equipments} />

      <div className="mt-auto">
        <FillBar
          maxValue={hero.maxExperience ?? 0}
          value={hero.currentExperience ?? 0}
          color="violet"
        />
      </div>
    </section>
  );
};
