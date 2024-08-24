import { MailWarningIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../ui/button';

export const SuccessResetPassPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center text-muted-foreground ">
      <MailWarningIcon className="size-20" />
      <h1 className="text-primary text-xl">Check Your Email</h1>
      <div className="mt-4 text-[15px]">
        <p className="">Please check the email address</p>
        {state && <p className="text-indigo-400">{state.email}</p>}
        <p>instructions to reset your password.</p>
      </div>
      <Button onClick={() => navigate('/login')} className="w-full mt-8">
        Login
      </Button>
    </section>
  );
};
