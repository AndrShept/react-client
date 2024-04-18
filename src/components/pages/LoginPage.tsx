import { useAppSelector } from '@/hooks/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../forms/LoginForm';

export const LoginPage = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, []);
  return (
    <section className="flex w-full h-full ">
      <div className="bg-[url(/back-3.svg)] bg-cover flex-1 gap-6 flex  flex-col items-center justify-center bg-no-repeat ">
        {/* <div className="text-center">
          <h1 className='text-4xl  font-bold text-transparent bg-clip-text  bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800'> Social Media</h1>
        </div> */}

        <div className="px-8 py-10 bg-secondary/70 backdrop-blur-md rounded-3xl border">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};
