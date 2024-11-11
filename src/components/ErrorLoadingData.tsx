import { DatabaseBackupIcon } from 'lucide-react';

import { Button } from './ui/button';

interface Props {
  refetchData: () => void;
}

export const ErrorLoadingData = ({ refetchData }: Props) => {
  return (
    <div className="size-full text-muted-foreground flex flex-col items-center justify-center max-w-[350px] mx-auto text-center ">
      <h1 className="text-primary text-3xl font-semibold mb-3">Oops!</h1>
      <p>
        Sorry, an unexpected error occurred while loading data from the server.
      </p>
      <p>Data not found!</p>
      <Button
        className="mt-3"
        onClick={refetchData}
        size={'icon'}
        variant={'outline'}
      >
        <DatabaseBackupIcon />
      </Button>
    </div>
  );
};
