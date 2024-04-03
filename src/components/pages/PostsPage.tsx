import { useAddPostMutation, useGetAllPostsQuery } from '@/lib/services/postApi';
import React from 'react';

export const PostsPage = () => {
  const {  isLoading, data } = useGetAllPostsQuery();

  console.log(isLoading);
  console.log(data);
  return <div>PostsPage</div>;
};
