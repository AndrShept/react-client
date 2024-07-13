import { useAppDispatch } from '@/hooks/store';
import { setStoreSearchValue } from '@/lib/redux/searchSlice';
import { SearchType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { SearchIcon, X } from 'lucide-react';
import qs from 'query-string';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounceValue } from 'usehooks-ts';

import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchProps {
  placeholder: string;
  className?: string;
  type: SearchType;
}

export const Search = ({ placeholder, className, type }: SearchProps) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);
  // const { pathname } = useLocation();
  // const navigate = useNavigate();
  const [searchValue, setSearchValue] = useDebounceValue('', 400);
  // const url = qs.stringifyUrl(
  //   {
  //     url: pathname,
  //     query: {
  //       users: searchValue,
  //     },
  //   },
  //   { skipEmptyString: true, skipNull: true },
  // );
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (type === 'users') {
      dispatch(setStoreSearchValue({ searchUser: searchValue }));
    }
    if (type === 'conversations') {
      dispatch(setStoreSearchValue({ searchConversation: searchValue }));
    }
  }, [searchValue]);

  return (
    <div className={cn('flex items-center relative ', className)}>
      <SearchIcon className="absolute left-2 size-5 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="bg-secondary/50 pr-6 pl-9"
        defaultValue={searchValue}
        onChange={onChange}
        ref={ref}
      />
      <Button
        type="reset"
        onClick={() => {
          if (ref.current) {
            ref.current.value = '';
          }
          ref.current?.focus();
          setSearchValue('');
          // navigate(pathname);
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
