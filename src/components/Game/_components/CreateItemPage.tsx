import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ItemType, WeaponType } from '@/lib/types/game.types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const CreateItemPage = () => {
  const itemTypeArray = Object.values(ItemType);
  const [modifier, setModifier] = useState({
    minDamage: undefined,
    maxDamage: undefined,
  });
  const [itemType, setItemType] = useState({
    type: '',
    weaponType: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImageUrl(`/sprites/weapons/${file.name}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModifier((prev) => ({ ...prev, [name]: Number(value) }));
  };
  const onCreate = () => {
    console.log({ ...itemType, imageUrl, modifier });
  };

  useEffect(() => {}, [modifier, itemType.type, itemType.weaponType]);
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
            <option value={''}>undefined</option>
            {itemTypeArray.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={itemType.weaponType}
            className="bg-secondary"
            onChange={(e) =>
              setItemType((prev) => ({ ...prev, weaponType: e.target.value }))
            }
          >
            <option value={''}>undefined</option>
            <option value={WeaponType.ONE_HAND}>{WeaponType.ONE_HAND}</option>
            <option value={WeaponType.TWO_HAND}>{WeaponType.TWO_HAND}</option>
          </select>
        </div>

        <div className="space-y-2 max-w-[200px]">
          <div className="flex gap-2 items-center">
            <p>min</p>
            <Input
              name="minDamage"
              onChange={handleChange}
              placeholder="minDamage"
            />
            <p>max</p>
            <Input
              name="maxDamage"
              onChange={handleChange}
              placeholder="maxDamage"
            />
          </div>
          <div>
            <p></p>
            <Input
              name="strength"
              onChange={handleChange}
              placeholder="strength"
            />
          </div>
          <div>
            <p></p>
            <Input
              name="dexterity"
              onChange={handleChange}
              placeholder="dexterity"
            />
          </div>
          <div>
            <p></p>
            <Input
              name="intelligence"
              onChange={handleChange}
              placeholder="intelligence"
            />
          </div>
          <div>
            <p></p>
            <Input
              name="constitution"
              onChange={handleChange}
              placeholder="constitution"
            />
          </div>
          <div>
            <p></p>
            <Input name="luck" onChange={handleChange} placeholder="luck" />
          </div>
        </div>

        <div onChange={handleChange} className="space-y-2 max-w-[200px]">
          <div>
            <p></p>
            <Input name="armor" onChange={handleChange} placeholder="armor" />
          </div>
          <div>
            <p></p>
            <Input
              name="magicResistances"
              onChange={handleChange}
              placeholder="magicResistances"
            />
          </div>
          <div>
            <p></p>
            <Input
              name="evasion"
              onChange={handleChange}
              placeholder="evasion"
            />
          </div>
          <div>
            <p></p>
            <Input
              name="spellDamage"
              onChange={handleChange}
              placeholder="spellDamage"
            />
          </div>
          <div>
            <p></p>
            <Input
              name="spellDamageCritPower"
              onChange={handleChange}
              placeholder="spellDamageCritPower"
            />
          </div>
          <div>
            <p></p>
            <Input
              name="spellDamageCritChance"
              onChange={handleChange}
              placeholder="spellDamageCritChance"
            />
          </div>
          <div>
            <p></p>
            <Input
              name="meleeDamage"
              onChange={handleChange}
              placeholder="meleeDamage"
            />
          </div>
          <div>
            <p></p>
            <Input
              name="meleeDamageCritPower"
              onChange={handleChange}
              placeholder="meleeDamageCritPower"
            />
          </div>
          <div>
            <p></p>
            <Input
              name="meleeDamageCritChance"
              onChange={handleChange}
              placeholder="meleeDamageCritChance"
            />
          </div>
          <div>
            <p></p>
            <Input
              name="duration"
              onChange={handleChange}
              placeholder="duration"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto space-x-4 mt-2">
        <Button asChild>
          <Link to={'/create-hero'}>Back</Link>
        </Button>
        <Button onClick={onCreate}>Create</Button>
      </div>
    </section>
  );
};
