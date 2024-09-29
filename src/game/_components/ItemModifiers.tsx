import { GameItem } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import React from 'react';

import { getRarityText } from '../utils';

interface Props {
  item: GameItem;
}

export const ItemModifiers = ({ item }: Props) => {
  return (
    <div className="flex flex-col ">
      <div className="mb-2">
        <h3 className={cn('text-base ', { ...getRarityText(item) })}>
          {item.name}
        </h3>
        <p className="text-zinc-600 ">
          rarity : <span>{item.rarity.toLowerCase()}</span>
        </p>
        {item.weaponType && (
          <p className="text-zinc-600 ">
            <span>
              {item.weaponType === 'TWO_HAND' ? 'two-handed' : 'one-handed'}
            </span>
          </p>
        )}
      </div>

      {!!item.modifier.minDamage && item.modifier.maxDamage && (
        <p className="text-yellow-300">
          {item.modifier.minDamage} - {item.modifier.maxDamage} damage
        </p>
      )}
      {!!item.modifier.strength && (
        <p>
          + {item.modifier.strength}
          <span> strength </span>
        </p>
      )}
      {!!item.modifier.dexterity && (
        <p>
          + {item.modifier.dexterity}
          <span> dexterity </span>
        </p>
      )}
      {!!item.modifier.constitution && (
        <p>
          + {item.modifier.constitution}
          <span> constitution </span>
        </p>
      )}

      {!!item.modifier.intelligence && (
        <p>
          + {item.modifier.intelligence}
          <span> intelligence </span>
        </p>
      )}
      {!!item.modifier.luck && (
        <p>
          + {item.modifier.luck}
          <span> luck </span>
        </p>
      )}
      {!!item.modifier.armor && (
        <p>
          + {item.modifier.armor}
          <span> armor </span>
        </p>
      )}
      {!!item.modifier.evasion && (
        <p>
          + {item.modifier.evasion}
          <span> evasion </span>
        </p>
      )}
      {!!item.modifier.maxHealth && (
        <p>
          + {item.modifier.maxHealth}
          <span> health </span>
        </p>
      )}
      {!!item.modifier.maxMana && (
        <p>
          + {item.modifier.maxMana}
          <span> mana</span>
        </p>
      )}
      {!!item.modifier.magicResistances && (
        <p>
          + {item.modifier.magicResistances}
          <span> magic resistances </span>
        </p>
      )}
      {!!item.modifier.meleeDamage && (
        <p>
          + {item.modifier.meleeDamage}
          <span> melee damage </span>
        </p>
      )}
      {!!item.modifier.meleeDamageCritChance && (
        <p>
          + {item.modifier.meleeDamageCritChance}
          <span> melee damage CC </span>
        </p>
      )}
      {!!item.modifier.meleeDamageCritPower && (
        <p>
          + {item.modifier.meleeDamageCritPower}
          <span> melee damage CP </span>
        </p>
      )}
      {!!item.modifier.spellDamage && (
        <p>
          + {item.modifier.spellDamage}
          <span> spell damage </span>
        </p>
      )}
      {!!item.modifier.meleeDamageCritChance && (
        <p>
          + {item.modifier.meleeDamageCritChance}
          <span> spell damage CC </span>
        </p>
      )}
      {!!item.modifier.spellDamageCritPower && (
        <p>
          + {item.modifier.spellDamageCritPower}
          <span> spell damage CP </span>
        </p>
      )}
    </div>
  );
};
