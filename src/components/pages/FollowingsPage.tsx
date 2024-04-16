import { X } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '../ui/button';

interface props {
  name: string;
  age: number | null;
}

export const FollowingsPage = () => {
  const [user, setUser] = useState([{ age: null || 0, name: '' }]);
  const onClick = () => {
    setUser((prev) => [
      ...prev,
      {
        age: Math.floor(Math.random() * 200),
        name: `dadasd ${Math.random() * 200}`,
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
  return (
    <div>
      <Button onClick={onClick}>add</Button>
      {user.map((item) => (
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
