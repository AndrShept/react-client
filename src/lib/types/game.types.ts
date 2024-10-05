import { User } from '.';

export interface Hero {
  id: string;
  avatarUrl: string;
  name: string;
  level: number;
  gold: number;
  premCoin: number;
  isBattle: boolean;
  currentExperience: number;
  maxExperience: number;
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

export interface GameItem {
  id: string;
  name: string;
  price: number;

  type: ItemType;
  slot: EquipmentSlot;
  rarity: RarityType;
  weaponType?: WeaponType;
  tag: ItemTag;
  imageUrl: string;

  inventory: InventoryItem[];

  modifierId: string;
  modifier: Modifier;

  createdAt: Date;
  updatedAt: Date;
}

export interface Equipment {
  id: string;

  isEquipped: boolean;
  isCanEquipped: boolean;

  heroId: string;
  hero: Hero;

  inventoryItem: InventoryItem;
  inventoryItemId: string;

  slot: EquipmentSlot;

  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryItem {
  id: string;
  quantity: number;
  isEquipped: boolean;
  isCanEquipped: boolean;

  heroId: string;
  hero: Hero;

  gameItemId: string;
  gameItem: GameItem;

  equipments: Equipment[];

  createdAt: Date;
  updatedAt: Date;
}

export interface Modifier {
  id?: string;
  minDamage?: number;
  maxDamage?: number;
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  constitution?: number;
  luck?: number;
  health?: number;
  mana?: number;
  maxHealth?: number;
  maxMana?: number;
  manaRegeneration?: number;
  healthRegeneration?: number;
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
  buffs?: Buff[];
  inventoryItems?: InventoryItem[];
  hero?: Hero[];
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

export enum EquipmentSlot {
  RIGHT_HAND = 'RIGHT_HAND',
  LEFT_HAND = 'LEFT_HAND',
  HELMET = 'HELMET',
  BREASTPLATE = 'BREASTPLATE',
  LEGS = 'LEGS',
  SHOES = 'SHOES',
  AMULET = 'AMULET',
  RING_LEFT = 'RING_LEFT',
  RING_RIGHT = 'RING_RIGHT',
  BELT = 'BELT',
}

export enum RarityType {
  COMMON = 'COMMON',
  MAGIC = 'MAGIC',
  EPIC = 'EPIC',
  RARE = 'RARE',
  LEGENDARY = 'LEGENDARY',
}

export enum ItemType {
  POTION = 'POTION',
  BOOK = 'BOOK',
  SWORD = 'SWORD',
  AXE = 'AXE',
  DAGGER = 'DAGGER',
  STAFF = 'STAFF',
  BREASTPLATE = 'BREASTPLATE',
  BELT = 'BELT',
  LEGS = 'LEGS',
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
