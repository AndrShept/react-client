import { BASE_URL } from '@/lib/constants';
import { useGetPhotosByUsernameQuery } from '@/lib/services/photoApi';
import { useParams } from 'react-router-dom';

import { UserProfilePhotosSkeleton } from './skeletons/UserProfilePhotosSkeleton';

export const UserProfilePhoto = () => {
  const { username } = useParams();
  const { isLoading, data: photos } = useGetPhotosByUsernameQuery(
    username as string,
  );
  if (isLoading) {
    return <UserProfilePhotosSkeleton />;
  }
  if (!isLoading && !photos?.length) {
    return (
      <p className="text-muted-foreground text-[15px]  m-auto">
        Photo not found
      </p>
    );
  }

  return (
    <ul className="flex flex-wrap gap-1  ">
      {photos?.map((photo) => (
        <article key={photo.id} className="flex-1 max-w-[200px]   ">
          <div className="relative max-w-[200px] min-w-[150px] overflow-hidden cursor-pointer  aspect-square ">
            <img
              loading="lazy"
              className="object-cover  size-full hover:scale-110 transition will-change-transform   "
              src={`${BASE_URL}${photo.url}`}
            />
          </div>
        </article>
      ))}
    </ul>
  );
};
