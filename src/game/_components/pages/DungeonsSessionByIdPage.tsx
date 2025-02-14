import { ErrorLoadingData } from '@/components/ErrorLoadingData';
import { Spinner } from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setSysMessages } from '@/lib/redux/heroSlice';
import {
  useGetDungeonsSessionByIdQuery,
  useLazyGetDungeonsSessionByIdQuery,
} from '@/lib/services/game/dungeonApi';
import { useUpdateHeroMutation } from '@/lib/services/game/heroApi';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DungeonMap } from '../dungeon/DungeonMap';

export const DungeonsSessionByIdPage = () => {
  const { dungeonSessionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data: dungeonSession,
    isLoading,
    isError,
  } = useGetDungeonsSessionByIdQuery(dungeonSessionId ?? '');
  const [refetchDungeonSession] = useLazyGetDungeonsSessionByIdQuery();
  const [updateHero] = useUpdateHeroMutation();
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const heroExistDungeon = dungeonSession?.dungeonParty?.some(
    (dungHero) => dungHero.memberId === heroId,
  );

  useEffect(() => {
    updateHero({ isDungeon: true });

    return () => {
      updateHero({ isDungeon: false });
    };
  }, []);
  useLayoutEffect(() => {
    if (!isLoading) {
      if (!heroExistDungeon) {
        navigate('/game/dungeons');
        dispatch(
          setSysMessages({
            success: false,
            message: 'Access to the dungeon session is denied',
            createdAt: Date.now(),
          }),
        );
      }

      if (dungeonSession?.endTime) {
        navigate('/game/dungeons');
        dispatch(
          setSysMessages({
            success: false,
            message: 'Dungeon session is ended',
            createdAt: Date.now(),
          }),
        );
      }
    }
  }, [dungeonSessionId, dungeonSession, isLoading, heroId]);
  if (isError) {
    return (
      <ErrorLoadingData
        refetchData={() => refetchDungeonSession(dungeonSessionId ?? '')}
      />
    );
  }
  if (isLoading) {
    return <Spinner />;
  }

  return <DungeonMap dungeonSessionId={dungeonSessionId!} />;
};
