import { useGetFavoritePostsQuery } from '@/lib/services/postApi';

import { PostCard } from '../PostCard';
import { PostPageSkeleton } from '../skeletons/PostPageSkeleton';

export const FavoritePostsPage = () => {
  const { data: favoritePosts, isLoading } = useGetFavoritePostsQuery();

  if (isLoading) {
    return <PostPageSkeleton />;
  }

  return (
    <section className="size-full flex">
      {!isLoading && !favoritePosts?.length && (
        <p className="text-muted-foreground text-sm m-auto ">
          Favorite posts not found
        </p>
      )}
      {!!favoritePosts?.length && (
        <ul className="mx-auto space-y-10">
          {favoritePosts?.map((post) => <PostCard key={post.id} post={post} />)}
        </ul>
      )}
    </section>
  );
};
