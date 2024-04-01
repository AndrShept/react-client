
import { RegisterForm } from '../RegisterForm';

export const RegisterPage = () => {
  return (
    <section className="flex w-full h-full md:flex-row flex-col">
      <div className=" flex-1 md:border-r border-b md:flex hidden">
        <img
        
          className="h-full w-full object-cover"
          src="/back2.jpg"
          alt="login_img"
        />
      </div>

      <div className=" flex-1 flex flex-col gap-14 items-center justify-center  p-4">
        <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
          SOCIAL MEDIA
        </h1>
        <RegisterForm />
      </div>
    </section>
  );
};
