import React from 'react';

export const NotFoundPage = () => {
  return (
    <section className="text-center h-full w-full flex justify-center items-center">
      <div className="min-h-screen flex flex-grow items-center justify-center ">
        <div className="rounded-lg bg-secondary/50 p-8 text-center shadow-xl">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="text-muted-foreground">
            Oops! The page you are looking for could not be found.
          </p>
          <a
            href="/"
            className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            {' '}
            Go back to Home{' '}
          </a>
        </div>
      </div>
    </section>
  );
};
