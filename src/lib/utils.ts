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


