import { cn } from '@/lib/utils';
import { setupListeners } from '@reduxjs/toolkit/query';
import { SearchIcon, X } from 'lucide-react';
import qs from 'query-string';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchProps {
  placeholder: string;
  className?: string;
}

export const Search = ({ placeholder, className }: SearchProps) => {
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const url = qs.stringifyUrl(
    {
      url: pathname,
      query: {
        users: searchValue,
      },
    },
    { skipEmptyString: true, skipNull: true },
  );
  useEffect(() => {
    setTimeout(() => {
      navigate(url);
    }, 300);
  }, [searchValue]);
  return (
    <div className={cn('flex items-center relative ', className)}>
      <SearchIcon className="absolute left-2 size-5 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="bg-secondary/50 pr-6 pl-9"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        ref={ref}
      />
      <Button
        onClick={() => {
          setSearchValue('');
          ref.current?.focus();
        }}
        disabled={!searchValue}
        className="absolute right-1 size-6 text-muted-foreground"
        variant={'ghost'}
        size={'icon'}
      >
        <X className="size-5" />
      </Button>
    </div>
  );
};
