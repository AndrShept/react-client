import { useGetAllPostsQuery } from '@/lib/services/postApi';

import { PostCard } from '../PostCard';

export const HomePage = () => {
  const { data: posts, isLoading } = useGetAllPostsQuery();

  if (isLoading) {
    return <div>POST..............LOADING..</div>;
  }
  if (!posts?.length) {
    return <div>Post not found</div>;
  }
  return (
    <>
      <ul className="flex flex-col gap-14">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};
