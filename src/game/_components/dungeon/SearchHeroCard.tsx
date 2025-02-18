import { BorderBeam } from '@/components/magicui/border-beam';
import { useSocket } from '@/components/providers/SocketProvider';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { addPartyMember } from '@/lib/redux/dungeonPartySlice';
import { setSysMessages } from '@/lib/redux/heroSlice';
import {
  useCreateDungeonPartyHeroMutation,
  useLazyGetDungeonPartyHeroByTermQuery,
} from '@/lib/services/game/dungeonPartyApi';
import { Hero, SysMessageType } from '@/lib/types/game.types';
import { CheckIcon, X } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

import { HeroAvatar } from '../HeroAvatar';

interface SearchHeroCardProps {
  hero: Hero;
  searchTerm: string | undefined;
}

export const SearchHeroCard = ({ hero, searchTerm }: SearchHeroCardProps) => {
  const [createDungeonPartyHero, { isLoading }] =
    useCreateDungeonPartyHeroMutation();
  const [refetchSearchHero] = useLazyGetDungeonPartyHeroByTermQuery();
  const dispatch = useAppDispatch();
  const dungeonSessionId = useAppSelector(
    (state) => state.dungeonSession.dungeonSession?.id ?? '',
  );
  const { socket } = useSocket();

  const addDungeonPartyHero = async () => {
    try {
      // socket?.emit(`invite-party`, hero.id, (resonce:any) => {
      //   console.log(resonce)
      // });
      const response = await createDungeonPartyHero({
        dungeonSessionId,
        heroId: hero.id,
      }).unwrap();
      if (!response.success) {
        dispatch(
          setSysMessages({
            createdAt: Date.now(),
            type: SysMessageType.ERROR,
            ...response,
          }),
        );
      }
      if (response.success) {
        await refetchSearchHero(searchTerm);
        dispatch(addPartyMember(response.data));
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex relative pr-3  hover:bg-secondary/30 rounded-md px-1.5 py-1 items-center overflow-hidden"
    >
      <div className="flex gap-1.5 items-center">
        <HeroAvatar classname="size-10" src={hero.avatarUrl} />
        <div className="text-xs">
          <p>{hero.name}</p>
          <p className="text-muted-foreground">level {hero.level}</p>
        </div>
      </div>
      {isLoading && <div className="text-xs"></div>}
      <div className="ml-auto flex gap-1">
        <Button
          disabled={isLoading}
          onClick={addDungeonPartyHero}
          className="size-6 p-1"
          variant={'outline'}
          size={'icon'}
        >
          <CheckIcon className="text-emerald-500" />
        </Button>
      </div>

      {isLoading && (
        <>
          <BorderBeam
            duration={6}
            className="from-transparent via-red-500 to-transparent"
          />
          <BorderBeam
            duration={6}
            delay={3}
            className="from-transparent via-blue-500 to-transparent"
          />
        </>
      )}
    </motion.li>
  );
};
