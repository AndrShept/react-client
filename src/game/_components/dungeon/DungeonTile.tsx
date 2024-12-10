import { useSocket } from '@/components/providers/SocketProvider';
import { useAppSelector } from '@/hooks/store';
import { Tile, TileType } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';

interface Props {
  isNearby?: boolean;
  tile: Tile | null;
  TILE_SIZE: number;
  x: number;
  y: number;
  dungeonSessionId: string;
}

export const DungeonTile = ({
  isNearby,
  TILE_SIZE,
  tile,
  x,
  y,
  dungeonSessionId,
}: Props) => {
  const { socket } = useSocket();
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const avatarUrl = useAppSelector((state) => state.hero.hero?.avatarUrl);

  return (
    <div
      onClick={() => {
        if (isNearby && !tile) {
          socket?.emit(`move-hero-${heroId}`, {
            x,
            y,
            dungeonSessionId,
          });
        }
      }}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        position: 'relative',
      }}
      className={cn('flex items-center justify-center', {
        'bg-red-300': isNearby && tile?.name !== TileType.wall && tile,
        'bg-white cursor-pointer opacity-5': isNearby && !tile,
      })}
    >
      {tile && !tile.hero?.avatarUrl && (
        <img
          src={`/sprites/dungeons/dung/${tile?.gid && tile.gid < 10 ? '00' : '0'}${tile?.gid - 1}.png`}
          alt="tile-image"
          className={cn('', {
            'hover:scale-105 duration-150 size-10':
              tile.name === TileType.chest,
          })}
        />
      )}
      {tile && tile.hero?.avatarUrl && (
        <img
          src={tile.hero.avatarUrl}
          alt="tile-image"
          className={cn('size-full', {})}
        />
      )}

      {tile?.name === TileType.hero && (
        <div className="absolute -top-5 text-center ">
          <p>{tile.hero?.name}</p>
        </div>
      )}
    </div>
  );
};
