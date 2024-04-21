import { useDelay } from '@/hooks/useDelay';
import { useGetPostByIdQuery } from '@/lib/services/postApi';
import { useParams } from 'react-router-dom';

import { CommentsList } from '../CommentsList';
import { PostCard } from '../PostCard';
import { PostCommentsForm } from '../forms/PostCommentsForm';
import { PostPageSkeleton } from '../skeletons/PostPageSkeleton';

export const PostsPageById = () => {
  const { postId } = useParams();
  if (!postId) {
    throw new Error('postId not found');
  }
  const { data: post, isLoading } = useGetPostByIdQuery(postId);

  if (isLoading ) {
    return <PostPageSkeleton />;
  }
  if (!post) {
    throw new Error('Post not found');
  }

  return (
    <section className="flex  flex-col gap-4">
      <PostCard post={post} />

      <PostCommentsForm postId={post.id} />

      <ul className="flex flex-col gap-4 ">
        {post.comments.map((comment) => (
          <CommentsList key={comment.id} comment={comment} />
        ))}
      </ul>
    </section>
  );
};
