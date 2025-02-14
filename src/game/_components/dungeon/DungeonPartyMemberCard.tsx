import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/store';
import { removePartyMember } from '@/lib/redux/dungeonPartySlice';
import { setSysMessages } from '@/lib/redux/heroSlice';
import {
  useDeleteDungeonPartyHeroMutation,
  useLazyGetDungeonPartyHeroByTermQuery,
} from '@/lib/services/game/dungeonPartyApi';
import { DungeonParty } from '@/lib/types/game.types';
import { PlusIcon, X } from 'lucide-react';
import { toast } from 'sonner';

import { HeroAvatar } from '../HeroAvatar';

interface DungeonPartyMemberCardProps {
  party: DungeonParty | null;
  isLoading: boolean;
  searchTerm?: string | undefined;
}

export const DungeonPartyMemberCard = ({
  party,
  isLoading,
  searchTerm,
}: DungeonPartyMemberCardProps) => {
  const [deleteDungeonPartyHero, { isLoading: isLoadingDelete }] =
    useDeleteDungeonPartyHeroMutation();
  const [refetchSearchHero] = useLazyGetDungeonPartyHeroByTermQuery();
  const dispatch = useAppDispatch();
  const onRemovePartyMember = async () => {
    try {
      const response = await deleteDungeonPartyHero(
        party?.memberId ?? '',
      ).unwrap();
      dispatch(removePartyMember({ memberId: party?.memberId ?? '' }));
      dispatch(setSysMessages({ ...response, createdAt: Date.now() }));
      await refetchSearchHero(searchTerm).unwrap();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };
  return (
    <>
      {party && (
        <li key={party.id} className="flex gap-1 items-center">
          <div className=" flex flex-col items-center group">
            <div className="relative group">
              <HeroAvatar classname="size-10" src={party.member.avatarUrl} />
              <Button
                disabled={isLoading || isLoadingDelete}
                onClick={onRemovePartyMember}
                className=" p-1 bg-black/50 hover:bg-black/90 rounded-full group-hover:opacity-100 opacity-0 absolute inset-0  "
                variant={'outline'}
              >
                <X className="text-red-500" />
              </Button>
            </div>

            <div className="text-xs flex flex-col items-center">
              <p className="break-words line-clamp-1">{party.member.name}</p>
              <p className="text-muted-foreground">
                level {party.member.level}
              </p>
            </div>
          </div>
        </li>
      )}
      {!party && (
        <div className="p-3 rounded-full border h-fit my-auto ">
          <PlusIcon className="text-muted size-6" />
        </div>
      )}
    </>
  );
};
