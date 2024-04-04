import React from 'react';
import { useParams } from 'react-router-dom';

export const PostsPageById = () => {
  const { postId } = useParams();
  console.log(postId);
  return <div>PostsPageById</div>;
};
