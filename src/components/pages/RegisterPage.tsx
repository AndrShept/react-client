import { RegisterForm } from '../forms/RegisterForm';

export const RegisterPage = () => {
  return (
    <section className="flex w-full h-full ">
      <div className="bg-[url(/back-3.svg)] bg-cover flex-1 flex items-center justify-center bg-no-repeat ">
        <div className="px-8 py-10 bg-secondary/70 backdrop-blur-md  rounded-3xl">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
};
