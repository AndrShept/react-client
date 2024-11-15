import { ErrorLoadingData } from '@/components/ErrorLoadingData';
import { Spinner } from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setSysMessages } from '@/lib/redux/heroSlice';
import {
  useGetDungeonsSessionByIdQuery,
  useLazyGetDungeonsSessionByIdQuery,
} from '@/lib/services/game/dungeonApi';
import { Container, Sprite, Stage, Text } from '@pixi/react';
import { useNavigate, useParams } from 'react-router-dom';

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
    <section>
      <Stage
        width={800}
        height={600}
        options={{ background: 0x1099bb }}
      ></Stage>
    </section>
  );
};
