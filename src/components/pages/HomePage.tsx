import { useGetAllPostsQuery } from '@/lib/services/postApi';

import { PostCard } from '../PostCard';
import { PostModal } from '../PostModal';
import { PostForm } from '../forms/PostForm';
import { PostPageSkeleton } from '../skeletons/PostPageSkeleton';

export const HomePage = () => {
  const { data: posts, isLoading } = useGetAllPostsQuery();

  return (
    <>
      <div className="max-w-[600px] mx-auto w-full md:p-0 p-4">
        <PostForm />
      </div>
      {isLoading && <PostPageSkeleton />}
      {!posts?.length && !isLoading && <div>Post not found</div>}
      {!isLoading && (
        <ul className="flex flex-col gap-14 p-4 mx-auto">
          {posts?.map((post) => (
            <PostModal key={post.id} post={post}>
              <PostCard post={post} />
            </PostModal>
          ))}
        </ul>
      )}
    </>
  );
};
