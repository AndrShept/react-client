import { useGetFavoritePostsQuery } from '@/lib/services/postApi';

import { PostCard } from '../PostCard';
import { PostPageSkeleton } from '../skeletons/PostPageSkeleton';

export const FavoritePostsPage = () => {
  const { data: favoritePosts, isLoading } = useGetFavoritePostsQuery();

  if (isLoading) {
    return <PostPageSkeleton />;
  }

  return (
    <>
      {!isLoading && favoritePosts?.length === 0 && (
        <p className="text-muted-foreground text-sm m-auto ">
          Favorite posts not found
        </p>
      )}
      <ul className="mx-auto space-y-10">
        {favoritePosts?.map((post) => <PostCard key={post.id} post={post} />)}
      </ul>
    </>
  );
};
