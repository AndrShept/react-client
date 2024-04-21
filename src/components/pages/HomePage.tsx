import { useDelay } from '@/hooks/useDelay';
import { useGetAllPostsQuery } from '@/lib/services/postApi';

import { PostCard } from '../PostCard';
import { PostPageSkeleton } from '../skeletons/PostPageSkeleton';

export const HomePage = () => {
  const { data: posts, isLoading } = useGetAllPostsQuery();

  if (isLoading ) {
    return <PostPageSkeleton />;
  }
  if (!posts?.length) {
    return <div>Post not found</div>;
  }
  console.log(posts);
  return (
    <ul className="flex flex-col gap-14">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
};
