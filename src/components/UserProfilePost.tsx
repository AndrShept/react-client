import { useGetAllUserPostsQuery } from '@/lib/services/postApi';
import { useParams } from 'react-router-dom';

import { PostCard } from './PostCard';
import { PostPageSkeleton } from './skeletons/PostPageSkeleton';

export const UserProfilePost = () => {
  const params = useParams();
  const { data: posts, isLoading } = useGetAllUserPostsQuery(
    params.username ?? '',
  );
  if (isLoading) {
    return <PostPageSkeleton />;
  }

  return (
    <ul className=" flex flex-col h-full gap-10 items-center">
      {!isLoading && !posts?.length && (
        <p className="text-sm text-muted-foreground m-auto">Post not found</p>
      )}
      {posts?.map((post) => <PostCard key={post.id} post={post} />)}
    </ul>
  );
};
