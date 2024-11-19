import { ErrorLoadingData } from '@/components/ErrorLoadingData';
import { Spinner } from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setSysMessages } from '@/lib/redux/heroSlice';
import {
  useGetDungeonsSessionByIdQuery,
  useLazyGetDungeonsSessionByIdQuery,
} from '@/lib/services/game/dungeonApi';
import { useNavigate, useParams } from 'react-router-dom';

import { DungeonMap } from '../dungeon/DungeonMap';

export const DungeonsSessionByIdPage = () => {
  const { dungeonSessionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  if (!dungeonSessionId) {
    navigate('/game/dungeons');
    return;
  }
  const {
    data: dungeonSession,
    isLoading,
    isError,
  } = useGetDungeonsSessionByIdQuery(dungeonSessionId);
  const [refetchDungeonSession] = useLazyGetDungeonsSessionByIdQuery();
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const heroExistDungeon = dungeonSession?.heroes?.some(
    (hero) => hero.id === heroId,
  );

  if (!heroExistDungeon && !isLoading) {
    navigate('/game/dungeons');
    dispatch(
      setSysMessages({
        success: false,
        message: 'Access to the dungeon session is denied',
        createdAt: Date.now(),
      }),
    );
  }
  if (dungeonSession?.endTime && !isLoading) {
    navigate('/game/dungeons');
    dispatch(
      setSysMessages({
        success: false,
        message: 'Dungeon session is ended',
        createdAt: Date.now(),
      }),
    );
  }
  console.log(dungeonSession);

  if (isError) {
    return (
      <ErrorLoadingData
        refetchData={() => refetchDungeonSession(dungeonSessionId)}
      />
    );
  }
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className='size-full'>
      <DungeonMap />
    </section>
  );
};
