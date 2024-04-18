import { X } from 'lucide-react';
import React, { useDeferredValue, useState, useTransition } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface props {
  name: string;
  age: number | null;
}

export const FollowingsPage = () => {
  const [user, setUser] = useState([{ age: null || 0, name: '' }]);
  const [filt, setFilt] = useState('');
  const [value, setValue] = useState(true);
  const [search, setSearch] = useState('');
  const data = ['audi', 'bmw', 'honda', 'citroen', 'toyota', 'shkoda'];
  const randomValue = data[Math.floor(Math.random() * data.length)];
  const onClick = () => {
    setUser((prev) => [
      ...prev,
      {
        age: Math.floor(Math.random() * 200),
        name: `${randomValue} ${Math.random() * 200}`,
      },
    ]);
  };
  const onRemove = (name: string) => {
    console.log(name);
    setUser((prev) => prev.filter((item) => item.name !== name));
  };
  const onIncrease = (name: string) => {
    setUser((prev) =>
      prev.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            age: item.age + 1,
          };
        }
        return item;
      }),
    );
  };
  const serachdedData = user.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );
  console.log(serachdedData);
  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <div className="mt-4">
        <input
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
          type="checkbox"
        />
        <Button
          variant={filt === 'first' ? 'secondary' : 'default'}
          onClick={() => {
            setFilt('first');
            setUser((prev) => prev.filter((item) => item.age > 20));
          }}
        >
          up
        </Button>
        <Button
          variant={filt === 'two' ? 'secondary' : 'default'}
          onClick={() => {
            setFilt('two');
            setUser((prev) => prev.filter((item) => item.age % 2 === 0));
          }}
        >
          parne
        </Button>
      </div>
      <Button onClick={onClick}>add</Button>
      {serachdedData.map((item) => (
        <div key={item.name} className="flex gap-2">
          <p>
            {item.name}
            <span className="text-yellow-500">{item.age}</span>
          </p>
          <Button
            onClick={() => onRemove(item.name)}
            variant={'ghost'}
            size={'icon'}
          >
            <X />
          </Button>
          <Button
            onClick={() => onIncrease(item.name)}
            variant={'ghost'}
            size={'icon'}
          >
            +
          </Button>
        </div>
      ))}
    </div>
  );
};

export const Search = ({
  setSearch,
  search,
}: {
  search: string;
  setSearch: (str: string) => void;
}) => {
  const defferendeValue = useDeferredValue(search);
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <Input
        value={search}
        onChange={(e) =>
          setTimeout(() => {
            setSearch(e.target.value)
          }, 100)
        }
      />
      {isPending && <div>loading...</div>}
    </>
  );
};
