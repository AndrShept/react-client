import { useDelay } from '@/hooks/useDelay';
import { useGetAllPostsQuery } from '@/lib/services/postApi';

import { PostCard } from '../PostCard';
import { PostPageSkeleton } from '../skeletons/PostPageSkeleton';

export const HomePage = () => {
  const { data: posts, isLoading } = useGetAllPostsQuery();
  const { isPending } = useDelay(1);

  if (isLoading || isPending) {
    return <PostPageSkeleton />;
  }
  if (!posts?.length) {
    return <div>Post not found</div>;
  }
  return (
    <ul className="flex flex-col gap-14">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
};
