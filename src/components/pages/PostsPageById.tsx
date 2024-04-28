import { useDelay } from '@/hooks/useDelay';
import { useGetCommentsQuery } from '@/lib/services/commentApi';
import { useGetPostByIdQuery } from '@/lib/services/postApi';
import { useNavigate, useParams } from 'react-router-dom';

import { CommentsList } from '../CommentsList';
import { PostCard } from '../PostCard';
import { PostCommentsForm } from '../forms/PostCommentsForm';
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
    console.log(comments)

  if (isLoading) {
    return <PostPageSkeleton />;
  }
  if (isLoadingComments) {
    return <p>LOADING COMMENTS</p>;
  }
  if (!post) {
    return <div>post not found</div>;
  }
  if (!comments) {
    return <div>comments not found</div>;
  }
  if (!post) {
    navigate('/');
  }

  return (
    <section className="flex  flex-col gap-4">
      <PostCard post={post} />

      <PostCommentsForm postId={post.id} />

      <ul className="flex flex-col gap-4 ">
        {comments.map((comment) => (
          <CommentsList key={comment.id} comment={comment} />
        ))}
      </ul>
    </section>
  );
};
