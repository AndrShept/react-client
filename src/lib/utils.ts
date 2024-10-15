import { match } from 'assert';
import { type ClassValue, clsx } from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';
import { io } from 'socket.io-client';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateNowFns = () => {
  const timestamp = format(new Date(Date.now()), 'dd-MM-yyyy, HH:mm');
  return timestamp;
};

export const dateFns = (timestamp: Date) => {
  return format(new Date(timestamp), 'dd.MM.yyyy, HH:mm');
};

export const dateFnsLessTime = (timestamp: Date) => {
  return formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  });
};
export const getTimeFns = (timestamp: number) => {
  return format(new Date(timestamp), 'HH:mm:ss');
};

export function hasErrorField(
  err: unknown,
): err is { data: { message: string } } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'data' in err &&
    typeof err.data === 'object' &&
    err.data !== null &&
    'message' in err.data
  );
}

export const convertToMb = (bit: number) => {
  if (bit > 1000000) {
    return `${Math.round(bit / (1024 * 1024))}mb`;
  }
  return `${(bit / (1024 * 1024)).toFixed(2)}mb`;
};
export const compactNumberFormatter = (num: number) => {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
};
interface Modifier {
  [key: string]: number;
}
export function subtractModifiers(
  firstModifier: Modifier,
  ...modifiers: Modifier[]
) {
  const result = { ...firstModifier };

  modifiers.forEach((modifier) => {
    Object.keys(modifier).forEach((key) => {
      const value = modifier[key as keyof Modifier];
      if (typeof value === 'number') {
        result[key as keyof Modifier] =
          (result[key as keyof Modifier] || 0) - value;
      }
    });
  });

  return result;
}

export function sumModifiers(...modifiers: Modifier[]) {
  const result: { [key: string]: number | any } = {};

  modifiers.forEach((modifier) => {
    for (const key in modifier) {
      const value = modifier[key as keyof Modifier];
      if (typeof value === 'number') {
        result[key] = (result[key] || 0) + value;
      } else if (result[key] === undefined) {
        result[key] = value;
      }
    }
  });

  return result;
}
