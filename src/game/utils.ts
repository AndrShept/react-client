import {
  EquipmentSlot,
  GameItem,
  InventoryItem,
  ItemType,
  Modifier,
  WeaponType,
} from '@/lib/types/game.types';

export const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const rand = (num: number) => {
  return Math.floor(Math.random() * num);
};

export const isObjectNearHero  = (
  heroX: number,
  heroY: number,
  objX: number,
  objY: number,
) => {
  const dx = Math.abs(heroX - objX);
  const dy = Math.abs(heroY - objY);

  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
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

export const getRarity = (gameItem: GameItem) => {
  if (!gameItem) return;
  return {
    'border-blue-700': gameItem.rarity === 'MAGIC',
    'border-purple-500': gameItem.rarity === 'EPIC',
    'border-orange-500 ': gameItem.rarity === 'RARE',
    'border-red-600 ': gameItem.rarity === 'LEGENDARY',
  };
};
export const getRarityText = (gameItem: GameItem | undefined) => {
  return {
    'text-primary': gameItem?.rarity === 'COMMON',
    'text-blue-600': gameItem?.rarity === 'MAGIC',
    'text-purple-500': gameItem?.rarity === 'EPIC',
    'text-orange-400': gameItem?.rarity === 'RARE',
    'text-red-500 ': gameItem?.rarity === 'LEGENDARY',
  };
};

export const equipmentsHeroList = [
  {
    id: 1,
    slot: EquipmentSlot.HELMET,
    imageUrl: '/sprites/icons/helmet.png',
  },
  {
    id: 2,
    slot: EquipmentSlot.BREASTPLATE,
    imageUrl: '/sprites/icons/armor.png',
  },
  {
    id: 3,
    slot: EquipmentSlot.BELT,
    imageUrl: '/sprites/icons/belt.png',
  },
  {
    id: 4,
    slot: EquipmentSlot.LEGS,
    imageUrl: '/sprites/icons/legs.png',
  },
  {
    id: 5,
    slot: EquipmentSlot.SHOES,
    imageUrl: '/sprites/icons/boots.png',
  },

  {
    id: 8,
    slot: EquipmentSlot.AMULET,
    imageUrl: '/sprites/icons/amulet.png',
  },
  {
    id: 9,
    slot: EquipmentSlot.RING_LEFT,
    imageUrl: '/sprites/icons/ring.png',
  },
  {
    id: 10,
    slot: EquipmentSlot.RING_RIGHT,
    imageUrl: '/sprites/icons/ring.png',
  },
  {
    id: 6,
    slot: EquipmentSlot.RIGHT_HAND,
    imageUrl: '/sprites/icons/weapon.png',
  },
  {
    id: 7,
    slot: EquipmentSlot.LEFT_HAND,
    imageUrl: '/sprites/icons/shield.png',
  },
];
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
    label: 'legs',
    id: 9,
  },
  {
    label: 'belt',
    id: 3,
  },
  {
    label: 'shoes',
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

