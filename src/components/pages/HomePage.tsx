import { useAuth } from '@/hooks/useAuth';
import { useGetAllPostsQuery } from '@/lib/services/postApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostCard } from '../PostCard';
import { PostModal } from '../PostModal';
import { PostForm } from '../forms/PostForm';
import { PostPageSkeleton } from '../skeletons/PostPageSkeleton';

export const HomePage = () => {
  const { data: posts, isLoading } = useGetAllPostsQuery();
  const { userData } = useAuth();
  const navigate = useNavigate();

  if (!userData) {
    navigate('/login');
    return;
  }

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
            <PostModal key={post.id}  post={post}>
              <PostCard  post={post} />
            </PostModal>
          ))}
        </ul>
      )}
    </>
  );
};
