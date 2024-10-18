import { Hero } from '@/lib/types/game.types';

import { FillBar } from './FillBar';
import { HeroEquipments } from './HeroEquipments';
import { HeroStatus } from './HeroStatus';

interface Props {
  hero: Hero;
}

export const Paperdoll = ({ hero }: Props) => {
console.log(hero.equipments.map(item => item.inventoryItem.gameItem.name))
  return (
    <section className="flex flex-col mx-auto max-w-fit gap-6 border p-6 rounded-xl min-w-[240px] h-fit">
      <HeroStatus
        avatarUrl={hero.avatarUrl}
        health={hero.health}
        maxHealth={hero.modifier.maxHealth}
        mana={hero.mana}
        maxMana={hero.modifier.maxMana}
        name={hero.name}
        level={hero.level}
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
