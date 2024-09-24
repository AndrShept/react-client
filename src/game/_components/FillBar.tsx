import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';

interface Props {
  value: number;
  maxValue: number;
  color: 'green' | 'blue' | 'violet';
}

export const FillBar = ({ value, maxValue, color }: Props) => {
  const lowPercentHealth = maxValue * 0.3;

  return (
    <div className="relative border rounded w-full  h-4">
      <div
        style={{ width: `${(value / maxValue) * 100}%` }}
        className={cn(
          ' h-full transition-all duration-300 ease-in-out rounded ',
          {
            'bg-gradient-to-b from-red-500  to-red-900':
              value <= lowPercentHealth && color === 'green',
            'bg-gradient-to-b from-green-500  to-green-900 ':
              color === 'green' && value > lowPercentHealth,
            'bg-gradient-to-b from-blue-500  to-blue-900': color === 'blue',
            'bg-gradient-to-b from-violet-500  to-violet-900':
              color === 'violet',
          },
        )}
      />
      <div className="absolute w-full -top-[1px] text-center">
        <p className=" text-[11px] font-light">
          {color === 'violet' && 'EXP'} {value}/{maxValue}
        </p>
      </div>
    </div>
  );
};
