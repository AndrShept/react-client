import { StatsUnion } from '@/lib/redux/heroSlice';
import { useEffect, useState } from 'react';

interface Props {
  freeStatsPoints: number | undefined;
  statsObj: Record<StatsUnion, number>;
}

export const useHeroStats = ({ freeStatsPoints, statsObj }: Props) => {
  const [statsState, setStatsState] = useState<
    {
      name: StatsUnion;
      value: number;
      id: number;
    }[]
  >([]);
  const [freePointsState, setFreePointsState] = useState(freeStatsPoints);
  const hasUnsavedChanges = freePointsState !== freeStatsPoints;
  const onDecrement = (statName: StatsUnion) => {
    if (freeStatsPoints! === freePointsState!) return;
    setStatsState((prev) =>
      prev.map((item) => {
        if (item.name === statName && item.value > statsObj[statName]) {
          setFreePointsState((prev) => prev! + 1);
          return { ...item, value: item.value - 1 };
        }
        return {
          ...item,
        };
      }),
    );
  };
  const onIncrement = (statName: StatsUnion) => {
    if (freePointsState === 0) return;
    setStatsState((prev) =>
      prev.map((item) =>
        item.name === statName
          ? { ...item, value: item.value + 1 }
          : { ...item },
      ),
    );

    setFreePointsState((prev) => prev! - 1);
  };
  useEffect(() => {
    setFreePointsState(freeStatsPoints);
    setStatsState([
      {
        name: 'strength',
        value: statsObj.strength,
        id: 1,
      },
      {
        name: 'dexterity',
        value: statsObj.dexterity,
        id: 2,
      },
      {
        name: 'intelligence',
        value: statsObj.intelligence,
        id: 3,
      },
      {
        name: 'constitution',
        value: statsObj.constitution,
        id: 4,
      },
      {
        name: 'luck',
        value: statsObj.luck,
        id: 5,
      },
    ]);
  }, [freeStatsPoints, statsObj]);

  return {
    statsState,
    freePointsState,
    hasUnsavedChanges,
    onDecrement,
    onIncrement,
  };
};
