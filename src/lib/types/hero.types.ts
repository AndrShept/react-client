import { User } from '.';

export interface Hero {
    id: string;
    name: string;
    level: number;
  
    strength: number;
    dexterity: number;
    intelligence: number;
    constitution: number;
    luck: number;
  
    health?: number;
    maxHealth?: number;
    mana?: number;
    maxMana?: number;
    
    experience: number;
  
    statPoints: number;
  
    weapon?: InventoryItem;
    shield?: InventoryItem;
    breastplate?: InventoryItem;
    ring?: InventoryItem;
    amulet?: InventoryItem;
    belt?: InventoryItem;
    shoes?: InventoryItem;
    helmet?: InventoryItem;
  
    buffs: Buff[];
    inventorys: InventoryItem[];
  
    user: User;
    userId: string;
  
    weaponId?: string;
    shieldId?: string;
    breastplateId?: string;
    ringId?: string;
    amuletId?: string;
    beltId?: string;
    shoesId?: string;
    helmetId?: string;
  
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface InventoryItem {
    id: string;
    name: string;
    type: ItemType;
    weaponType?: WeaponType;
  
    isEquipped: boolean;
    isCanEquipped: boolean;
  
    itemModifier?: Modifier;
  
    hero?: Hero;
    heroId?: string;
  
    heroWeapon?: Hero;
    heroShield?: Hero;
    heroBreastplate?: Hero;
    heroBelt?: Hero;
    heroShoes?: Hero;
    heroHelmet?: Hero;
    heroRing?: Hero;
    heroAmulet?: Hero;
  
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface Modifier {
    id: string;
  
    strength: number;
    dexterity: number;
    intelligence: number;
    constitution: number;
    luck: number;
  
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
  
    inventoryItem?: InventoryItem;
    inventoryItemId?: string;
  
    buffs: Buff[];
  }
  
  interface Buff {
    id: string;
    name: string;
  
    hero?: Hero;
    heroId?: string;
  
    buffModifier?: Modifier;
    modifierId?: string;
  
    createdAt: Date;
    updatedAt: Date;
  }
  
  enum ItemType {
    POTION = "POTION",
    BOOK = "BOOK",
    WEAPON = "WEAPON",
    BREASTPLATE = "BREASTPLATE",
    BELT = "BELT",
    SHOES = "SHOES",
    HELMET = "HELMET",
    SHIELD = "SHIELD",
    RING = "RING",
    AMULET = "AMULET",
    MISC = "MISC"
  }
  
  enum WeaponType {
    ONE_HAND = "ONE_HAND",
    TWO_HAND = "TWO_HAND"
  }