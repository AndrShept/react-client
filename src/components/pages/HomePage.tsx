import { useGetAllPostsQuery } from '@/lib/services/postApi';
import React from 'react';

import { PostCard } from '../PostCard';

export const HomePage = () => {
  const { data: posts, isLoading } = useGetAllPostsQuery();

  console.log(isLoading);
  if (isLoading) {
    return <div>POST..............LOADING..</div>;
  }
  if (!posts?.length) {
   return <div>Post not found</div>
  }
  console.log(posts[0].imageUrl);
  return (
    <>
      <ul className="flex flex-col gap-14">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </ul>
    </>
  );
};
