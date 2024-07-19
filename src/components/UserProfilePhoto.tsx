import { BASE_URL } from '@/lib/constants';
import { useGetPhotosByUsernameQuery } from '@/lib/services/photoApi';
import { useParams } from 'react-router-dom';

import { LikeIcon } from './icons/LikeIcon';
import { UserProfilePhotosSkeleton } from './skeletons/UserProfilePhotosSkeleton';

export const UserProfilePhoto = () => {
  const { username } = useParams();
  const { isLoading, data: photos } = useGetPhotosByUsernameQuery(
    username as string,
  );
  console.log(photos);
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
        <article
          key={photo.id}
          className="flex-1 flex flex-col max-w-[200px] relative group   "
        >
          <div className="relative max-w-[200px] min-w-[150px] overflow-hidden cursor-pointer  aspect-square ">
            <img
              loading="lazy"
              className="object-cover  size-full hover:scale-110 transition will-change-transform   "
              src={`${BASE_URL}${photo.url}`}
            />
          </div>
          <div className="absolute flex items-center justify-center inset-0 bg-black/70 opacity-0 hover:opacity-100 transition-all  border-2">
            <LikeIcon
              likedByUser={photo.likedByUser}
              id={photo.id}
              photoId={photo.id}
              likeCount={photo._count.likes}
              type="photo"
              icon="heart"
              color='red'
              username= {username}
            />
          </div>
        </article>
      ))}
    </ul>
  );
};
