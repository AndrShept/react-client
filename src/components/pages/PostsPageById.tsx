import { useGetPostByIdQuery } from '@/lib/services/postApi';
import { dateFns } from '@/lib/utils';
import { useParams } from 'react-router-dom';

import { PostCard } from '../PostCard';
import { PostCommentsForm } from '../PostCommentsForm';
import { UserAvatar } from '../UserAvatar';

export const PostsPageById = () => {
  const { postId } = useParams();
  if (!postId) {
    throw new Error('postId not found');
  }
  const { data: post, isLoading } = useGetPostByIdQuery(postId);

  if (isLoading) {
    return <p>Loading..</p>;
  }
  if (!post) {
    throw new Error('Post not found');
  }

  return (
    <section className="flex flex-col gap-4">
      <PostCard post={post} />
      <div className="">
        <PostCommentsForm postId={post.id} />
      </div>
      <ul className="flex flex-col gap-2">
        {post.comments.map((comment) => (
          <li className="flex flex-col md:p-4 p-2 bg-secondary/40 rounded-md">
            <div className="flex items-center gap-2">
              <UserAvatar
                avatarImg={comment.user.avatarUrl}
                username={comment.user.username}
              />
              <div className="flex flex-col">
                <p className="text-sm">{comment.user.username}</p>
                <time className="text-xs text-muted-foreground">
                  {dateFns(comment.createdAt)}
                </time>
              </div>
            </div>
            <p className="mt-2 break-words">{comment.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
