import { useSocket } from '@/components/providers/SocketProvider';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { isObjectNearHero } from '@/game/utils';
import {  useAppSelector } from '@/hooks/store';

import { Tile, TileType } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';

interface Props {
  tile: Tile;
  TILE_SIZE: number;
  dungeonSessionId: string;
}

export const DungeonTile = ({ TILE_SIZE, tile, dungeonSessionId }: Props) => {
  const { socket } = useSocket();
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const heroPos = useAppSelector((state) => state.dungeonSession.heroPos);
  const tileUrl = `/sprites/dungeons/dung/${tile.gid < 10 ? '00' : tile.gid >= 100 ? '' : '0'}${tile.gid}.png`;
  const onClickTile = () => {
    if (isNearby && tile?.name === TileType.ground && !tile.objectId) {
      console.log(tile?.x, tile?.y);
      socket?.emit(`move-hero-${heroId}`, {
        x: tile.x,
        y: tile.y,
        dungeonSessionId,
      });
   
    }
  };

  const isNearby = isObjectNearHero(
    heroPos?.x ?? 1,
    heroPos?.y ?? 1,
    tile.x,
    tile.y,
  );

  return (
    <div
      onClick={onClickTile}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        position: 'absolute',
        left: `${tile.x * 48}px`,
        top: `${tile.y * 48}px`,
      }}
      className={cn('flex   ', {})}
    >
      {tile?.name === TileType.ground && (
        <img
          src={tileUrl}
          alt="tile-image"
          className={cn('z-[1] absolute', {})}
        />
      )}
      {tile?.name === TileType.decor && (
        <img
          src={tileUrl}
          alt="tile-image"
          className={cn('absolute z-[4] size-full ', {})}
        />
      )}
      {/* {tile?.name === TileType.wall && (
        <img
          src={`/sprites/dungeons/dung/${tile.gid < 10 ? '00' : '0'}${tile?.gid}.png`}
          alt="tile-image"
          className={cn('z-[2]', {})}
        />
      )} */}
      {tile?.name === TileType.object && (
        <img
          src={tileUrl}
          alt="tile-image"
          className={cn('absolute z-[4]  ', {})}
        />
      )}

      <ContextMenu>
        <ContextMenuTrigger>
          {tile?.object?.name === 'chest' && (
            <img
              src={`/sprites/dungeons/dung/${tile.object && tile.object.gid < 10 ? '00' : tile.object.gid >= 100 ? '' : '0'}${tile.object?.gid}.png`}
              alt="tile-image"
              className={cn(
                'absolute size-full z-[4] scale-[80%] hover:scale-90  transition  ',
                { 'animate-pulse': isNearby },
              )}
            />
          )}
        </ContextMenuTrigger>
        {isNearby && (
          <ContextMenuContent className="  text-sm min-w-fit">
            <ContextMenuItem
              className="text-sm"
              onClick={() => console.log(tile)}
            >
              Attack
            </ContextMenuItem>
            <ContextMenuItem
              className="text-sm"
              onClick={() => console.log(tile?.name)}
            >
              Info
            </ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>

      {tile?.heroId && (
        <img
          src={tile.hero?.avatarUrl}
          alt="tile-image"
          className={cn('size-full z-[5] absolute ', {})}
        />
      )}

      {tile?.name === TileType.ground &&
        isNearby &&
        !tile.objectId &&
        !tile.heroId && (
          <div className="bg-black opacity-50 cursor-pointer z-[5] absolute size-full" />
        )}
    </div>
  );
};
