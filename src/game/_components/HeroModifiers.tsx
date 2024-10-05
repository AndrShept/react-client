import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Modifier } from '@/lib/types/game.types';
import React, { useMemo } from 'react';
import { toast } from 'sonner';

import { StatsBlock } from './StatsBlock';

interface Props {
  modifiers: Modifier | undefined;
  freeStatsPoints: number;
}

export const HeroModifiers = ({ modifiers, freeStatsPoints }: Props) => {
  return (
    <section className=" md:flex hidden flex-col border p-4 h-fit rounded gap-2 text-sm  ">
      <StatsBlock
        freeStatsPoints={freeStatsPoints}
        constitution={modifiers?.constitution}
        dexterity={modifiers?.dexterity}
        strength={modifiers?.strength}
        intelligence={modifiers?.intelligence}
        luck={modifiers?.luck}
      />
      <Separator />
      <div className="text-muted-foreground">
        <p className="text-primary">DEF</p>
        <p>
          <span>armor:</span> {modifiers?.armor ? modifiers.armor : 0}
        </p>
        <p>
          <span>evasion:</span> {modifiers?.armor ? modifiers.evasion : 0}
        </p>
        <p>
          <span>magic resistances:</span>{' '}
          {modifiers?.armor ? modifiers.magicResistances : 0}
        </p>
      </div>
      <Separator />
      <div className="text-muted-foreground">
        <p className="text-primary">PHYS DAMAGE</p>
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
        <p className="text-primary">MAGIC DAMAGE</p>

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
