import { User } from '.';

export interface Hero {
  id: string;
  avatarUrl: string;
  name: string;
  level: number;
  gold: number;
  premCoin: number;
  isBattle: boolean;
  experience: number;
  statsPoints: number;
  freeStatsPoints: number;
  inventorySlots: number;
  modifierId: string;
  modifier: Modifier;
  userId: string;
  user?: User;
  buffs: Buff[];
  inventorys: InventoryItem[];
  equipments: Equipment[];
  createdAt: Date;
  updatedAt: Date;
}
interface Equipment {
  id: string;
  heroId: string;
  hero: Hero;

  createdAt: Date;
  updatedAt: Date;
}
export interface GameItem {
  id: string;
  name: string;
  quantity?: number;
  type: ItemType;
  weaponType?: WeaponType;
  tag: ItemTag;
  imageUrl: string;
  inventory: InventoryItem[];
  isEquipped: boolean;
  isCanEquipped: boolean;
  modifierId: string;
  modifier: Modifier;

  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryItem {
  id: string;
  heroId: string;
  hero?: Hero;
  gameItemId: string;
  gameItem: GameItem;

  createdAt: Date;
  updatedAt: Date;
}

export interface Modifier {
  id: string;
  minDamage?: number;
  maxDamage?: number;
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  constitution?: number;
  luck?: number;
  health: number;
  mana: number;
  maxHealth: number;
  maxMana: number;
  armor?: number;
  magicResistances?: number;
  evasion?: number;
  spellDamage?: number;
  spellDamageCritPower?: number;
  spellDamageCritChance?: number;
  meleeDamage?: number;
  meleeDamageCritPower?: number;
  meleeDamageCritChance?: number;
  duration?: number;
  buffs: Buff[];
  inventoryItems: InventoryItem[];
  hero: Hero[];
}

interface Buff {
  id: string;
  name: string;
  modifierId: string;
  modifier: Modifier;
  heroId: string;
  hero: Hero;

  createdAt: Date;
  updatedAt: Date;
}

export enum ItemType {
  POTION = 'POTION',
  BOOK = 'BOOK',
  WEAPON = 'WEAPON',
  BREASTPLATE = 'BREASTPLATE',
  BELT = 'BELT',
  SHOES = 'SHOES',
  HELMET = 'HELMET',
  SHIELD = 'SHIELD',
  RING = 'RING',
  AMULET = 'AMULET',
  MISC = 'MISC',
}

export enum ItemTag {
  ALL = 'ALL',
  NOVICE = 'NOVICE',
}

export enum WeaponType {
  ONE_HAND = 'ONE_HAND',
  TWO_HAND = 'TWO_HAND',
}
