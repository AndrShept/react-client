import React from 'react';

import { Button } from '../button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const SelectedButton = ({ children, ...props }: Props) => {
  return (
    <Button
      className="text-lg"
      size={'icon'}
      variant={'secondary'}
      type="button"
      {...props}
    >
      {children}
    </Button>
  );
};
