import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import { DungeonPartyList } from './DungeonPartyList';
import { SearchHeroList } from './SearchHeroList';

export const InvitePartyButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useDebounceValue<undefined | string>(
    undefined,
    400,
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        {' '}
        <Button variant={isOpen ? 'secondary' : 'outline'} size={'icon'}>
          <Plus className="text-yellow-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="end"
        className="h-[400px] max-w-60 flex flex-col gap-3"
      >
        <DungeonPartyList searchTerm={searchTerm} />
        <Input
          defaultValue={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value.trim() === '' ? undefined : e.target.value,
            )
          }
          placeholder="enter hero name"
          className=" focus-visible:ring-1 focus-visible:ring-offset-0"
        />
        <SearchHeroList searchTerm={searchTerm} />
      </PopoverContent>
    </Popover>
  );
};
