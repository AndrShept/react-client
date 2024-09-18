import { useState } from 'react';

interface useGetStatsProps {
  value?: number;
  baseValue?: number;
  statsArr?: statsArrProps[];
}
interface statsArrProps {
  name: string;
  value: number ;
  baseValue: number;
  color: string;
}

export const defaultsStatArr = [
  {
    name: 'Strength',
    value: 10,
    baseValue: 10,
    color: 'text-red-500',
  },
  {
    name: 'Dexterity',
    value: 10,
    baseValue: 10,
    color: 'text-green-500',
  },
  {
    name: 'Intelligence',
    value: 10,
    baseValue: 10,
    color: `text-sky-500`,
  },
  {
    name: 'Constitution',
    value: 10,
    baseValue: 10,
    color: 'text-stone-500',
  },
  {
    name: 'Luck',
    value: 5,
    baseValue: 5,
    color: 'text-purple-500',
  },
];

export const useGetStats = ({
  baseValue = 10,
  value = 10,
  statsArr =defaultsStatArr ,
}: useGetStatsProps) => {
  const [statPoints, setStatPoints] = useState({
    value: value,
    baseValue: baseValue,
  });
  const [stats, setStats] = useState(statsArr);

  return {
    statPoints,
    stats,
    setStats,
    setStatPoints,
  };
};
