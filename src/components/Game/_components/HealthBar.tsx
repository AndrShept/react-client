import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  value: number;
  maxValue: number;
  color: 'green' | 'blue';
}

export const HealthBar = ({ value, maxValue, color }: Props) => {
  return (
    <div className="relative border rounded w-28 h-4">
      <div
        style={{ width: `${(value / maxValue) * 100}%` }}
        className={cn(
          ' h-full transition-all duration-300 ease-in-out rounded ',
          {
            'bg-gradient-to-b from-red-500  to-red-900':
              value < 30 && color === 'green',
            'bg-gradient-to-b from-green-500  to-green-900 ': color === 'green',
            'bg-gradient-to-b from-blue-500  to-blue-900': color === 'blue',
          },
        )}
      />
      <div className="absolute w-full -top-[1px] text-center">
        <p className=" text-[11px]">{value}</p>
      </div>
    </div>
  );
};
