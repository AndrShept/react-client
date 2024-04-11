import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateNowFns = () => {
  const timestamp = format(new Date(Date.now()), 'dd-MM-yyyy, HH:mm');
  return timestamp;
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
