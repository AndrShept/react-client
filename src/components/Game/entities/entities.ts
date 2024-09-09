import { KAPLAYCtx } from 'kaplay';

export const createPlayer = (
  k: KAPLAYCtx,
  username: string,
  playerPos: { x: number; y: number },
) => {
  return k.make([
    k.sprite('hero', {
      anim: 'idle',
    }),
    k.pos(playerPos.x, playerPos.y),
    k.scale(1.2),
    k.area({
      scale: 0.5,
      offset: k.vec2(0, 30),
    }),
    k.anchor('center'),
    k.body(),

    'player',
    {
      hp: 100,
      dead: false,
      username,
      speed: 200,
    },
  ]);
};
