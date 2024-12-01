// import { useSocket } from '@/components/providers/SocketProvider';
// import { Button } from '@/components/ui/button';
// import { useSocketHeroMove } from '@/hooks/game/useSocketHeroMove';
// import { useAppDispatch, useAppSelector } from '@/hooks/store';
// import { moveHero } from '@/lib/redux/dungeonSessionSlice';
// import {
//   ChevronDownIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ChevronUpIcon,
// } from 'lucide-react';
// import { useEffect } from 'react';

// interface Props {
//   dungeonSessionId: string;
//   heroPos: {x:number, y:number}
// }

// export const DungeonMovingButtons = ({ dungeonSessionId,heroPos }: Props) => {
//   const dispatch = useAppDispatch();
//   const heroId = useAppSelector((state) => state.hero.hero?.id);
//   if (!heroId) return;
//   const { socketMove } = useSocketHeroMove({ dungeonSessionId, heroId,heroPos });

//   return (
//     <section className="flex flex-col w-[120px]   ">
//       <Button
//         className="mx-auto"
//         onClick={() => {
//           dispatch(moveHero({ dx: 0, dy: -1, heroId }));
//           socketMove();
//         }}
//         variant={'outline'}
//         size={'icon'}
//       >
//         <ChevronUpIcon />
//       </Button>
//       <div className="flex justify-between">
//         <Button
//           onClick={() => {
//             dispatch(moveHero({ dx: -1, dy: 0, heroId }));
//             socketMove();
//           }}
//           variant={'outline'}
//           size={'icon'}
//         >
//           <ChevronLeftIcon />
//         </Button>

//         <Button
//           onClick={() => {
//             dispatch(moveHero({ dx: 1, dy: 0, heroId }));
//             socketMove();
//           }}
//           variant={'outline'}
//           size={'icon'}
//         >
//           <ChevronRightIcon />
//         </Button>
//       </div>

//       <Button
//         className="mx-auto"
//         onClick={() => {
//           dispatch(moveHero({ dx: 0, dy: 1, heroId }));
//           socketMove()
//         }}
//         variant={'outline'}
//         size={'icon'}
//       >
//         <ChevronDownIcon />
//       </Button>
//     </section>
//   );
// };
