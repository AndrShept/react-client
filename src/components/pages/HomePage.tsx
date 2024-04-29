import { useGetAllPostsQuery } from '@/lib/services/postApi';

import { PostCard } from '../PostCard';
import { PostModal } from '../PostModal';
import { PostPageSkeleton } from '../skeletons/PostPageSkeleton';

export const HomePage = () => {
  const { data: posts, isLoading } = useGetAllPostsQuery();

  if (isLoading) {
    return <PostPageSkeleton />;
  }
  if (!posts?.length) {
    return <div>Post not found</div>;
  }
  return (
    <ul className="flex flex-col gap-14 p-4">
      {posts.map((post) => (
        <PostModal key={post.id} post={post}>
          <PostCard post={post} />
        </PostModal>
      ))}
    </ul>
  );
};
