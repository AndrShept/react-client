import { useSocket } from '@/components/providers/SocketProvider';
import { showInviteToPartyToast } from '@/game/_components/InviteToPartyToast';
import { setSysMessages } from '@/lib/redux/heroSlice';
import { useLazyGetAllDungeonsSessionInStatusQuery } from '@/lib/services/game/dungeonApi';
import {
  GroupInviteResponse,
  Hero,
  ISysMessages,
  SessionStatus,
} from '@/lib/types/game.types';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store';

export const useSocketListener = () => {
  const { socket } = useSocket();
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const dispatch = useAppDispatch();
  const dungeonSessionId = useAppSelector(
    (state) => state.dungeonSession.dungeonSession?.id,
  );

  const [refetchDungeonSessionStatus, { isLoading: isLoadingDungeonStatus }] =
    useLazyGetAllDungeonsSessionInStatusQuery();

  useEffect(() => {
    console.log(dungeonSessionId);
    console.log('GO');
    socket?.emit('join-room', dungeonSessionId);
  }, [dungeonSessionId, socket]);

  useEffect(() => {
    if (!socket) return;
    const invitePartyLister = (
      partyLeader: Hero,
      cb: (data: GroupInviteResponse) => void,
    ) => {
      showInviteToPartyToast(partyLeader, heroId, cb);
      setTimeout(() => {
        cb('timeout');
      }, 10000);
    };
    const sysHeroMessageListener = (data: ISysMessages) => {
      console.log(data);
      dispatch(setSysMessages(data));
    };
    const sysDungeonMessage = (data: ISysMessages) => {
      console.log(data);
      dispatch(setSysMessages(data));
    };
    const refreshDataListener = async (data: boolean) => {
      console.log(data);
      if (data) {
        await refetchDungeonSessionStatus(SessionStatus.INPROGRESS);
      }
    };

    socket.on(`invite-party-${heroId}`, invitePartyLister);
    socket.on(`sys-msg-${dungeonSessionId}`, sysDungeonMessage);
    socket.on(`sys-msg-${heroId}`, sysHeroMessageListener);
    socket.on(`refetch-data-${heroId}`, refreshDataListener);
    return () => {
      socket.off(`invite-party-${heroId}`, invitePartyLister);
      socket.off(`sys-msg-${dungeonSessionId}`, sysDungeonMessage);
      socket.off(`sys-msg-${heroId}`, sysHeroMessageListener);
    };
  }, [dispatch, dungeonSessionId, heroId, socket]);
};
