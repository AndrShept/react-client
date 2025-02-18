import { useAppSelector } from '@/hooks/store';
import { useGetDungeonPartyQuery } from '@/lib/services/game/dungeonPartyApi';
import { DungeonPartyMemberCard } from './DungeonPartyMemberCard';

interface DungeonPartyListProps {
  searchTerm: string | undefined;
}

export const DungeonPartyList = ({ searchTerm }: DungeonPartyListProps) => {
  const dungeonSessionId = useAppSelector(
    (state) => state.dungeonSession.dungeonSession?.id ?? '',
  );
  const dungeonParty = useAppSelector((state) => state.dungeonParty.party);
  const { isLoading, isError } = useGetDungeonPartyQuery(dungeonSessionId);
  const partySlots = Array.from(
    { length: 3 },
    (_, idx) => dungeonParty && dungeonParty[idx],
  );

 
  if (isLoading) return 'wait';
  if (isError) return 'Data fetching error';

  return (
    <>
      {!!dungeonParty?.length && (
        <h3 className="text-center font-medium text-transparent bg-clip-text bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500">
          Party members
        </h3>
      )}
      <ul className="flex gap-2 mx-auto">
        {partySlots?.map((slot, idx) => (
          <DungeonPartyMemberCard
            key={slot?.id ?? idx}
            searchTerm={searchTerm}
            party={slot}
            isLoading={isLoading}
            dungeonSessionId={dungeonSessionId}
          />
        ))}
      </ul>
    </>
  );
};
