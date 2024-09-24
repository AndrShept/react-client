import { cn } from '@/lib/utils';

import { GameIconWrapper } from './GameIconWrapper';

interface Props {
  wrapperClassname?: string;
  iconClassname?: string;
}

export const AbilityGameIcon = ({ iconClassname, wrapperClassname }: Props) => {
  return (
    <GameIconWrapper classname={wrapperClassname}>
      <img
        className={cn('size-8', iconClassname)}
        src="/sprites/icons/ability.png"
        alt="ability-image"
      />
    </GameIconWrapper>
  );
};
