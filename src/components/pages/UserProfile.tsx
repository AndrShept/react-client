import { useGetUserByUsernameQuery } from '@/lib/services/userApi';
import { useParams } from 'react-router-dom';

import { UserProfileForm } from '../forms/UserProfileForm';
import { Button } from '../ui/button';

export const UserProfile = () => {
  const { username } = useParams();
  console.log(username);
  if (!username) {
    throw new Error('User not found');
  }
  const { data: user, isLoading } = useGetUserByUsernameQuery(username);
  if (isLoading) {
    return <div>LAODINMG...</div>;
  }
  if (!user) {
    return <div>User not found</div>;
  }
  console.log(user);
  return (
    <article className="flex flex-col border rounded-lg  gap-4 bg-secondary/50">
      <section className=" border-b p-4">
        <h1 className="font-semibold text-2xl">Personal info</h1>
        <p className="text-muted-foreground text-sm">
          Customize how your profile information will apper to the networks.
        </p>
      </section>
  
        <UserProfileForm  user={user}/>
      
    </article>
  );
};
