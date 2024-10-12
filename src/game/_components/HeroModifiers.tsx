import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/hooks/store';
import { Modifier } from '@/lib/types/game.types';

import { StatsBlock } from './StatsBlock';

interface Props {
  modifiers: Modifier | undefined;
  freeStatsPoints: number;
}

export const HeroModifiers = () => {
  const baseStats = useAppSelector((state) => state.hero.hero?.baseStats);
  const freeStatsPoints = useAppSelector(
    (state) => state.hero.hero?.freeStatsPoints ?? 0,
  );
  const modifiers = useAppSelector((state) => state.hero.hero?.modifier);
  return (
    <section className=" md:flex hidden flex-col border p-4 h-fit rounded gap-2 text-sm  ">
      <StatsBlock
        freeStatsPoints={freeStatsPoints}
        baseStatsObj={baseStats!}
        statsObj={{
          constitution: modifiers?.constitution ?? 0,
          dexterity: modifiers?.dexterity ?? 0,
          strength: modifiers?.strength ?? 0,
          intelligence: modifiers?.intelligence ?? 0,
          luck: modifiers?.luck ?? 0,
        }}
      />
      <Separator />
      <div className="text-muted-foreground">
        <p className="text-primary mb-1">DEF</p>
        <p>
          <span>armor:</span> {modifiers?.armor ? modifiers.armor : 0}
        </p>
        <p>
          <span>evasion:</span> {modifiers?.evasion ? modifiers.evasion : 0}
        </p>
        <p>
          <span>magic resistances:</span>{' '}
          {modifiers?.magicResistances ? modifiers.magicResistances : 0}
        </p>
      </div>
      <Separator />
      <div className="text-muted-foreground">
        <p className="text-primary mb-1">PHYS DAMAGE</p>
        <p>
          <span>damage:</span> {modifiers?.minDamage ? modifiers.minDamage : 0}{' '}
          - {modifiers?.maxDamage ? modifiers.maxDamage : 0}
        </p>
        <p>
          <span>melee damage:</span>{' '}
          {modifiers?.meleeDamage ? modifiers.meleeDamage : 0}
        </p>
        <p>
          <span>melee crit chance:</span>{' '}
          {modifiers?.meleeDamageCritChance
            ? modifiers.meleeDamageCritChance
            : 0}
        </p>
        <p>
          <span>melee crit power:</span>{' '}
          {modifiers?.meleeDamageCritPower ? modifiers.meleeDamageCritPower : 0}
        </p>
      </div>
      <Separator />
      <div className="text-muted-foreground">
        <p className="text-primary mb-1">MAGIC DAMAGE</p>

        <p>
          <span>spell damage:</span>{' '}
          {modifiers?.spellDamage ? modifiers.spellDamage : 0}
        </p>
        <p>
          <span>spell crit chance</span>{' '}
          {modifiers?.spellDamageCritChance
            ? modifiers.spellDamageCritChance
            : 0}
        </p>
        <p>
          <span>spell crit power</span>{' '}
          {modifiers?.spellDamageCritPower ? modifiers.spellDamageCritPower : 0}
        </p>
      </div>
    </section>
  );
};
