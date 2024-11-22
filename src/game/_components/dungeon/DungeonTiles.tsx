import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';

interface Props {
  isNearby: boolean;
  tile: number;
  TILE_SIZE: number;
}
const convertTo2DArray = (data: number[], width: number, height: number): number[][] => {
  const result: number[][] = [];
  for (let i = 0; i < height; i++) {
    const start = i * width;
    const row = data.slice(start, start + width);

    // Якщо рядок коротший за ширину, додаємо нулі
  

    result.push(row);
  }
  return result;
};

export const DungeonTiles = ({ isNearby, TILE_SIZE, tile }: Props) => {

  
  useEffect(() => {
 
    

  }, [])
   
  return (
    <div
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        position: 'relative',
      }}
      className={ cn( 'bg-transparent will-change-transform',{
    
        'bg-lime-500': isNearby && tile !== 0,
      })}
    >
      {tile === 3 && (
        <img
          src="/sprites/dungeons/hero.png"
          alt="Hero"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
      )}
      {tile === 1 && (
        <img
          className="hover:scale-105 transition-transform  "
          src="/sprites/dungeons/chest.png"
          alt="Chest"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            imageRendering: 'pixelated'
          }}
        />
      )}
      {tile === 2 && (
        <img
          className="hover:scale-105  transition-transform  "
           src="/sprites/dungeons/skeleton.png"

          alt="Monster"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
              imageRendering: 'pixelated'
          }}
        />
      )}
      {tile === 0 && (
        <img
           src="/sprites/dungeons/ground.png"
          alt="ground"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </div>
  );
};
