import { User } from '.';

export interface Hero {
  id: string;
  avatarUrl: string;
  name: string;
  level: number;
  gold: number;
  premCoin: number;
  isBattle: boolean;
  isDungeon: boolean;
  health: number;
  mana: number;
  currentExperience: number;
  maxExperience: number;
  statsPoints: number;
  freeStatsPoints: number;
  inventorySlots: number;
  modifierId: string;
  modifier: Modifier;
  userId: string;
  user?: User;
  baseStats: BaseStats;
  baseStatsId: string;
  dungeonSessions: DungeonSession[];
  dungeonSessionId: string[];
  buffs: Buff[];
  inventorys: InventoryItem[];
  equipments: Equipment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseStats {
  id?: string;
  strength: number;
  dexterity: number;
  intelligence: number;
  constitution: number;
  luck: number;
  Hero?: Hero[];
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
  id?: string;

  isEquipped: boolean;
  isCanEquipped?: boolean;

  heroId: string;
  hero?: Hero;

  inventoryItem: InventoryItem;
  inventoryItemId: string;

  slot: EquipmentSlot;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface InventoryItem {
  id: string;
  quantity: number;
  isEquipped: boolean;
  isCanEquipped: boolean;
  slot: EquipmentSlot;
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

export interface Buff {
  id: string;
  name: string;
  imageUrl: string;
  duration: number;
  timeRemaining: number;
  modifierId?: string;
  modifier: Modifier;
  heroId?: string;
  hero?: Hero;
  gameItem?: GameItem;
  gameItemId?: string;

  createdAt: string;
  updatedAt: string;
}

export interface Dungeon {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  difficulty: Difficulty;
  duration: number;
  sessions: DungeonSession[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DungeonSession {
  id: string;
  status: SessionStatus;
  difficulty: Difficulty;
  duration: number;
  tileSize: number;
  mapWidth: number;
  mapHeight: number;
  timeRemaining: number;
  endTime?: Date;
  dungeon?: Dungeon;
  dungeonId: string;
  hero?: Hero;
  heroId: string;

  tiles: Tile[];
  dungeonHeroes: DungeonHero[];

  createdAt: Date;
  updatedAt: Date;
}

export interface Tile {
  id: string;
  gid: number;
  height: number;
  width: number;
  name: TileType;
  rotation: number;
  type: string;
  visible: boolean;
  x: number;
  y: number;
  object?: Tile,
  objectId?:string
  hero?: Hero;
  heroId?: string;
  monster?: Monster;
  monsterId?: string;
  dungeonSession?: DungeonSession;
  dungeonSessionId?: string;
}

export interface ISocketDungeonMapData {
  dungeonMap: Tile[];
  height: number;
  width: number;
  tileSize: number;
  heroPos: { x: number; y: number };
}
export interface ISocketDungeonMoveHero {
  newTiles: Tile[];
  heroPos: { x: number; y: number };
}

export interface DungeonHero {
  id: string;
  death: number;
  x: number;
  y: number;
  hero: Hero;
  heroId: string;
  dungeonSession: DungeonSession;
  dungeonSessionId: string;
  createdAt: Date;
}

export interface Monster {
  id: string;
  name: string;
  imageUrl: string;
  health: number;
  mana: number;
  modifier: Modifier;
  modifierId: string;
  rarity: RarityType;
  tiles: Tile[];
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
export enum TileType {
  wall = 'wall',
  hero = 'hero',
  monster = 'monster',
  chest = 'chest',
  loot = 'loot',
  decor = 'decor',
  object = 'object',
  ground = 'ground',
}

export enum SessionStatus {
  INPROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum Difficulty {
  EASY = 'EASY',
  NORMAL = 'NORMAL',
  HARD = 'HARD',
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

// export interface TileMap {
//   compressionlevel: number;
//   height: number;
//   infinite: boolean;
//   layers: Layer[];
//   nextlayerid: number;
//   nextobjectid: number;
//   orientation: string;
//   renderorder: string;
//   tiledversion: string;
//   tileheight: number;
//   tilesets: Tileset[];
//   tilewidth: number;
//   type: string;
//   version: string;
//   width: number;
// }

// export interface Layer {
//   draworder?: string; // Присутній тільки для "objectgroup"
//   id: number;
//   name: string;
//   objects?: TileObject[]; // Присутній тільки для "objectgroup"
//   data?: number[]; // Присутній тільки для "tilelayer"
//   height?: number; // Присутній тільки для "tilelayer"
//   opacity: number;
//   type: "objectgroup" | "tilelayer";
//   visible: boolean;
//   width?: number; // Присутній тільки для "tilelayer"
//   x: number;
//   y: number;
// }

// export interface TileObject {
//   gid: number;
//   height: number;
//   id: number;
//   name: string;
//   rotation: number;
//   type: string;
//   visible: boolean;
//   width: number;
//   x: number;
//   y: number;
//   hero?: Hero | null
// }

// export interface Tileset {
//   columns: number;
//   firstgid: number;
//   image: string;
//   imageheight: number;
//   imagewidth: number;
//   margin: number;
//   name: string;
//   spacing: number;
//   tilecount: number;
//   tileheight: number;
//   tilewidth: number;
// }
