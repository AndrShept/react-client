import { ErrorLoadingData } from '@/components/ErrorLoadingData';
import { Spinner } from '@/components/Spinner';
import {
  useGetDungeonsQuery,
  useLazyGetDungeonsQuery,
} from '@/lib/services/game/dungeonApi';

import { DungeonCard } from '../dungeon/DungeonCard';


export const DungeonsPage = () => {
  const { data: dungeons, isLoading, isError } = useGetDungeonsQuery();
  const [refetchDungeons] = useLazyGetDungeonsQuery();

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <ErrorLoadingData refetchData={() => refetchDungeons()} />;
  }

  return (
    <div className=" size-full flex flex-col p-4 ">
      <ul className="grid  xl:grid-cols-4 md:grid-cols-3  grid-cols-2 mx-auto gap-4 ">
        {dungeons?.map((dungeon) => (
          <DungeonCard key={dungeon.id} dungeon={dungeon} />
        ))}
      </ul>
    </div>
  );
};



