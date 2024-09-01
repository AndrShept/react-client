/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div className="h-full w-full flex gap-4 flex-col items-center justify-center ">
      <h1 className="text-4xl">404</h1>
      <div className="text-center text-muted-foreground">
        <h2>Oops!</h2>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
