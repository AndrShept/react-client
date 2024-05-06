import { useDelay } from '@/hooks/useDelay';
import { useGetCommentsQuery } from '@/lib/services/commentApi';
import { useGetPostByIdQuery } from '@/lib/services/postApi';
import { useNavigate, useParams } from 'react-router-dom';

import { CommentsCard } from '../CommentsCard';
import { PostCard } from '../PostCard';
import { PostCommentsForm } from '../forms/PostCommentsForm';
import { PostCommentsSkeleton } from '../skeletons/PostCommentsSkeleton';
import { PostPageSkeleton } from '../skeletons/PostPageSkeleton';

export const PostsPageById = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  if (!postId) {
    throw new Error('postId not found');
  }
  const { data: post, isLoading } = useGetPostByIdQuery(postId);
  const { data: comments, isLoading: isLoadingComments } =
    useGetCommentsQuery(postId);

  if (isLoading) {
    return <PostPageSkeleton />;
  }

  if (!post) {
    return <div>post not found</div>;
  }

  if (!post) {
    navigate('/');
  }

  return (
    <section className="flex  flex-col gap-4 mx-auto">
      <PostCard post={post} />

      <PostCommentsForm postId={post.id} />

      <ul className="flex flex-col gap-4 mt-3 ">
        {!comments?.length && (
          <p className="text-muted-foreground text-sm text-center ">
            Comments not found
          </p>
        )}
        {isLoadingComments && <PostCommentsSkeleton />}
        {!isLoadingComments &&
          comments?.map((comment) => (
            <CommentsCard key={comment.id} comment={comment} />
          ))}
      </ul>
    </section>
  );
};
