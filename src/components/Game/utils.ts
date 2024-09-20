import { GameItem, InventoryItem, Modifier } from '@/lib/types/game.types';

export const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const rand = (num: number) => {
  return Math.floor(Math.random() * num);
};

export const getModifiers = (item: GameItem | null) => {
  const modifiersArr = [
    {
      name: 'strength',
      value: item?.modifier?.strength,
      color: 'text-red-500',
    },
    {
      name: 'dexterity',
      value: item?.modifier?.dexterity,
      color: 'text-green-500',
    },
    {
      name: 'intelligence',
      value: item?.modifier?.intelligence,
      color: `text-sky-500`,
    },
    {
      name: 'constitution',
      value: item?.modifier?.constitution,
      color: 'text-stone-500',
    },
    { name: 'luck', value: item?.modifier?.luck, color: 'text-purple-500' },
    { name: 'armor', value: item?.modifier?.armor },
    { name: 'magic resistance', value: item?.modifier?.magicResistances },
    { name: 'evasion', value: item?.modifier?.evasion },
    { name: 'spell damage', value: item?.modifier?.spellDamage },
    {
      name: 'spell damage crit power',
      value: item?.modifier?.spellDamageCritPower,
    },
    {
      name: 'spell damage crit chance',
      value: item?.modifier?.spellDamageCritChance,
    },
    {
      name: 'melee damage',
      value: item?.modifier?.meleeDamage,
    },
    {
      name: 'melee damage crit power',
      value: item?.modifier?.meleeDamageCritPower,
    },
    {
      name: 'melee damage crit chance',
      value: item?.modifier?.meleeDamageCritChance,
    },
  ];
  return modifiersArr;
};

export const shopNavList = [
  {
    label: 'sword',
    id: 14,
  },
  {
    label: 'axe',
    id: 2,
  },
  {
    label: 'dagger',
    id: 6,
  },
  {
    label: 'staff',
    id: 13,
  },
  {
    label: 'shield',
    id: 12,
  },
  {
    label: 'helmet',
    id: 8,
  },
  {
    label: 'breastplate',
    id: 5,
  },
  {
    label: 'leg',
    id: 9,
  },
  {
    label: 'belt',
    id: 3,
  },
  {
    label: 'boot',
    id: 4,
  },

  {
    label: 'glover',
    id: 7,
  },

  {
    label: 'amulet',
    id: 1,
  },

  {
    label: 'ring',
    id: 11,
  },

  {
    label: 'potion',
    id: 10,
  },
];
