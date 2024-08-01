import { useAuth } from '@/hooks/useAuth';
import { useGetAllPostsQuery } from '@/lib/services/postApi';
import { LocationState } from '@/lib/types';
import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PostCard } from '../PostCard';
import { PostModal } from '../PostModal';
import { PostForm } from '../forms/PostForm';
import { PostPageSkeleton } from '../skeletons/PostPageSkeleton';

export const HomePage = () => {
  const { data: posts, isLoading } = useGetAllPostsQuery();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

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
          {posts?.map((post) => <PostCard key={post.id} post={post} />)}
          {state && <PostModal />}
        </ul>
      )}
    </>
  );
};
