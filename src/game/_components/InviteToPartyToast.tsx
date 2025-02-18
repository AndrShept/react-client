import { useSocket } from '@/components/providers/SocketProvider';
import {
  useGetAllDungeonsSessionInStatusQuery,
  useLazyGetAllDungeonsSessionInStatusQuery,
} from '@/lib/services/game/dungeonApi';
import { Hero, SessionStatus } from '@/lib/types/game.types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const InviteToPartyToast = ({
  partyLeader,
  heroId,
  cb,
}: {
  partyLeader: Hero;
  heroId: string | undefined;
  cb: (data: any) => void;
}) => {
  const [refetchDungeonSessionStatus, { isLoading }] =
    useLazyGetAllDungeonsSessionInStatusQuery();
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div className="max-w-md w-full bg-background shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src={partyLeader.avatarUrl}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{partyLeader.name}</p>
            <p className="mt-1 text-sm">Invite the party ??</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={async () => {
            cb({ accepted: true });
            setIsVisible(false);

          }}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Accept
        </button>
        <button
          onClick={() => {
            cb({ accepted: false });
            setIsVisible(false);
          }}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const showInviteToPartyToast = (
  partyLeader: Hero,
  heroId: string | undefined,
  cb: (data: any) => void,
) => {
  toast.custom(
    (t) => (
      <InviteToPartyToast partyLeader={partyLeader} heroId={heroId} cb={cb} />
    ),
    {
      duration: 10000,
    },
  );
};
