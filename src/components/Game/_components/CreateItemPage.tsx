import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateItemMutation } from '@/lib/services/game/ItemApi';
import {
  ItemTag,
  ItemType,
  Modifier,
  WeaponType,
} from '@/lib/types/game.types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const CreateItemPage = () => {
  const itemTypeArray = Object.values(ItemType);
  const [createItem, { isLoading }] = useCreateItemMutation();
  const [modifier, setModifier] = useState<Partial<Modifier> | null>(null);
  const [itemType, setItemType] = useState<{
    type: string | null;
    weaponType: string | null;
  }>({
    type: null,
    weaponType: null,
  });
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [tag, setTag] = useState('ALL');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImageUrl(`/sprites/armor/${file.name}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModifier((prev) => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value),
    }));
  };
  const onCreate = async () => {
    console.log({
      ...itemType,
      imageUrl,
      name,
      tag,
      modifier,
    });
    try {
      await createItem({
        ...itemType,
        imageUrl,
        name,
        tag,
        modifier,
      }).unwrap();
      toast.success('GODDDD');

    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <section className=" h-full flex flex-col max-w-4xl mx-auto p-10">
      <div className="flex border p-8 gap-4 ">
        <div className="flex flex-col gap-2">
          <div className="max-w-[150px]  ">
            <img
              className="rounded shadow border size-32 mb-4 "
              src={imageUrl}
              alt="imageUrl"
            />
            <label htmlFor="file">
              <Button
                className="w-full"
                variant={'outline'}
                onClick={() => document.getElementById('file')?.click()}
              >
                file upload
                <input hidden id={'file'} onChange={onChange} type="file" />
              </Button>
            </label>
          </div>

          <select
            className="bg-secondary"
            onChange={(e) =>
              setItemType((prev) => ({ ...prev, type: e.target.value }))
            }
          >
            <option value={undefined}>undefined</option>
            {itemTypeArray.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={undefined}
            className="bg-secondary"
            onChange={(e) =>
              setItemType((prev) => ({ ...prev, weaponType: e.target.value }))
            }
          >
            <option value={undefined}>null</option>
            <option value={WeaponType.ONE_HAND}>{WeaponType.ONE_HAND}</option>
            <option value={WeaponType.TWO_HAND}>{WeaponType.TWO_HAND}</option>
          </select>

          <select
            className="bg-secondary"
            onChange={(e) => setTag(e.target.value)}
            value={tag}
          >
            <option value={ItemTag.ALL}>{ItemTag.ALL}</option>
            <option value={ItemTag.NOVICE}>{ItemTag.NOVICE}</option>
          </select>
        </div>

        <div className="space-y-2 max-w-[200px]">
          <div>
            <p className="text-sm text-muted-foreground">name</p>
            <Input name="name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex gap-2 items-center mt-5">
            <p>min</p>
            <Input name="minDamage" onChange={handleChange} />
            <p>max</p>
            <Input name="maxDamage" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">strength</p>
            <Input name="strength" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">dexterity</p>
            <Input name="dexterity" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">intelligence</p>
            <Input name="intelligence" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">constitution</p>
            <Input name="constitution" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">luck</p>
            <Input name="luck" onChange={handleChange} />
          </div>
        </div>

        <div onChange={handleChange} className="space-y-2 max-w-[200px]">
          <div>
            <p className="text-sm text-muted-foreground">armor</p>
            <Input name="armor" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">magicResistances</p>
            <Input name="magicResistances" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">evasion</p>
            <Input name="evasion" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">spellDamage</p>
            <Input name="spellDamage" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              spellDamageCritPower
            </p>
            <Input name="spellDamageCritPower" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              spellDamageCritChance
            </p>
            <Input name="spellDamageCritChance" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">meleeDamage</p>
            <Input name="meleeDamage" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              meleeDamageCritPower
            </p>
            <Input name="meleeDamageCritPower" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              meleeDamageCritChance
            </p>
            <Input name="meleeDamageCritChance" onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">duration</p>
            <Input name="duration" onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="mx-auto space-x-4 mt-2">
  
        <Button asChild>
          <Link to={'/create-hero'}>Back</Link>
        </Button>
        <Button disabled={isLoading} onClick={onCreate}>
          Create
        </Button>
      </div>
    </section>
  );
};
