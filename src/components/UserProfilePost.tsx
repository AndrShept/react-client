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
    <>
      {!isLoading && !posts?.length && (
        <p className="text-sm text-muted-foreground m-auto">Post not found</p>
      )}
      {!!posts?.length && !isLoading && (
        <ul className=" mx-auto  space-y-10 ">
          {posts?.map((post) => <PostCard key={post.id} post={post} />)}
        </ul>
      )}
    </>
  );
};
