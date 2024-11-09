import { Spinner } from '@/components/Spinner';
import { useGetDungeonsQuery } from '@/lib/services/game/dungeonApi';

import { DungeonCard } from '../dungeon/DungeonCard';

export const DungeonsPage = () => {
  const { data: dungeons, isLoading, isError } = useGetDungeonsQuery();

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <p>Error loading data</p>;
  }

  return (
    <div className=" size-full flex flex-col p-4 ">
      <ul className="grid  xl:grid-cols-4 md:grid-cols-3  grid-cols-2 mx-auto gap-2 ">
        {dungeons?.map((dungeon) => (
          <DungeonCard key={dungeon.id} dungeon={dungeon} />
        ))}
      </ul>
    </div>
  );
};
