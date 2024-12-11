// import { TileMap, TileObject } from '@/lib/types/game.types';
// import { useEffect, useState } from 'react';

// const convertTo2DArray = (
//   data: TileObject[],
//   width: number,
//   height: number,
// ): TileObject[][] => {
//   const result: TileObject[][] = [];
//   for (let i = 0; i < height; i++) {
//     const start = i * width;
//     const row = data.slice(start, start + width);

//     result.push(row);
//   }
//   return result;
// };

// export const useDungeonMap = () => {
//   const [tileMap, setTileMap] = useState<TileMap | null>(null);
//   const [isLoading, setLoading] = useState(true);
//   const [map, setMap] = useState<(null | TileObject)[][]>([]);

//   useEffect(() => {
//     const loadJSON = async () => {
//       try {
//         const res = await fetch('/sprites/dungeons/testDung.json');
//         const data = (await res.json()) as TileMap;
//         setTileMap(data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadJSON();
//   }, []);

//   useEffect(() => {
//     if (!tileMap?.height || !tileMap?.width) return;
//     setMap(() => {
//       const result = [];
//       for (let i = 0; i < tileMap.height; i++) {
//         const row = [];
//         for (let j = 0; j < tileMap.width; j++) {
//           row.push(null); 
//         }
//         result.push(row); 
//       }
//       return result;
//     });
//   }, [tileMap?.height, tileMap?.width]);

//   return {
//     tileObject: tileMap?.layers[0].objects,
//     width: tileMap?.width,
//     height: tileMap?.height,
//     tileSize: tileMap?.tileheight,
//     isLoading,
//     map,
//     setMap
//   };
// };
