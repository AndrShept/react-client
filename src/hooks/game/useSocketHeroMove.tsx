// import { useSocket } from '@/components/providers/SocketProvider';
// import { useEffect, useRef } from 'react';

// import { useAppDispatch, useAppSelector } from '../store';

// interface Props {
//   dungeonSessionId: string;
//   heroId: string;
//   heroPos: { x: number; y: number };
// }

// export const useSocketHeroMove = ({
//   dungeonSessionId,
//   heroId,
//   heroPos,
// }: Props) => {
//   const { socket } = useSocket();
//   const heroPosRef = useRef(heroPos);
//   const socketMove = () => {
//     console.log(heroPos.x, heroPos.y);
//     socket?.emit(`move-hero-${heroId}`, {
//       x: heroPosRef.current.x,
//       y: heroPosRef.current.y,
//       dungeonSessionId,
//     });
//   };
//   useEffect(() => {
//     heroPosRef.current = heroPos;
//   }, [heroPos]);

//   useEffect(() => {
//     const socketListener = (data: any) => {
//       console.log(data);
//     };

//     socket?.on(`move-hero-${heroId}`, socketListener);
//     console.log(heroPos);
//     return () => {
//       socket?.off(`move-hero-${heroId}`, socketListener);
//     };
//   }, [dungeonSessionId, socket, heroId]);

//   return {
//     heroId,
//     socketMove,
//   };
// };
