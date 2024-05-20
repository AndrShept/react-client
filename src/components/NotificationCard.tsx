import {
  useLazyGetNotificationsQuery,
  useUpdateNotificationMutation,
} from '@/lib/services/notificationApi';
import { Notification, NotificationType } from '@/lib/types';
import { cn, dateFnsLessTime } from '@/lib/utils';
import {
  CheckIcon,
  ExternalLinkIcon,
  LucideIcon,
  UserRoundPlusIcon,
} from 'lucide-react';
import {
  HeartIcon,
  MailPlusIcon,
  MessageSquareWarningIcon,
  NewspaperIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';

import { ActionTooltip } from './ActionTooltip';
import { UserAvatar } from './UserAvatar';
import { Button } from './ui/button';

interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const [checkNotification, { isLoading }] = useUpdateNotificationMutation();
  const [refetchNotifications] = useLazyGetNotificationsQuery();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();

  const onCheck = async () => {
    try {
      await checkNotification(notification.id).unwrap();
      await refetchNotifications().unwrap();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const likeOptions = () => {
    if (notification.postId) {
      return `liked your post ${notification.post?.content}`;
    }
    if (notification.commentId) {
      return `liked your comment ${notification.comment?.content}`;
    }
  };
  const onNavigate = () => {
    if (notification.type === 'post') {
      navigate(notificationLink.post);
    }
    if (notification.type === 'follower') {
      navigate(notificationLink.follower);
    }
  };

  const iconType: { [key in NotificationType]: LucideIcon } = {
    [NotificationType.Post]: NewspaperIcon,
    [NotificationType.Message]: MailPlusIcon,
    [NotificationType.Like]: HeartIcon,
    [NotificationType.Comment]: MessageSquareWarningIcon,
    [NotificationType.Follower]: UserRoundPlusIcon,
  };

  const notificationMessage: {
    [key in NotificationType]: string;
  } = {
    comment: `your post`,
    like: likeOptions() || '',
    message: `send new message`,
    post: `create new post ${notification.post?.content}`,
    follower: 'your new follower',
  };
  const notificationLink: {
    [key in NotificationType]: string;
  } = {
    comment: ``,
    like: ``,
    message: ``,
    post: `/posts/${notification.postId}`,
    follower: `/users/${notification.author?.username}`,
  };

  const NotificationIcon = iconType[notification.type];
  return (
    <article className="group py-3 px-4 border-transparent transition hover:border-muted-foreground border flex flex-col  text-sm gap-y-2 ">
      <section className="flex gap-x-2 items-center justify-between">
        <div className="flex gap-2">
          <div className=" ">
            <div className="relative">
              <UserAvatar
                avatarUrl={notification.author?.avatarUrl}
                isOnline={notification.author?.isOnline!}
                username={notification.author?.username}
              />
              <div
                className={cn(
                  ' -right-1 -bottom-1 scale-[85%] absolute size-[24px]  rounded-full flex items-center justify-center ',
                  {
                    'bg-red-500': notification.type === 'like',
                    'bg-sky-600': notification.type === 'post',
                    'bg-green-600': notification.type === 'follower',
                  },
                )}
              >
                <NotificationIcon className="size-4" />
              </div>
            </div>
          </div>

          <div className="flex flex-col text-muted-foreground ">
            <p className=" line-clamp-4">
              <span className="text-primary font-semibold ">
                {notification.author?.username}{' '}
              </span>
              {notificationMessage[notification.type]}
            </p>
            <time className="break-all line-clamp-1 text-xs">
              {dateFnsLessTime(notification.createdAt)}
            </time>
          </div>
        </div>

        <div>
          {!notification.isRead && (
            <div className="size-2 rounded-full bg-blue-400 " />
          )}
          {notification.isRead && (
            <CheckIcon className=" text-green-500 size-5" />
          )}
        </div>
      </section>
      <section
        className={cn(
          ' opacity-0 group-hover:opacity-100 text-muted-foreground flex items-center gap-x-[1px] ml-auto',
          {
            'opacity-100': isMobile,
          },
        )}
      >
        {notificationLink[notification.type] && (
          <ActionTooltip label="Go to">
            <Button
              onClick={onNavigate}
              variant={'ghost'}
              size={'icon'}
              className="size-6"
            >
              <ExternalLinkIcon className="size-[18px]" />
            </Button>
          </ActionTooltip>
        )}

        {!notification.isRead && (
          <ActionTooltip label="Check">
            <Button
              disabled={isLoading}
              onClick={onCheck}
              variant={'ghost'}
              size={'icon'}
              className={'size-6'}
            >
              <CheckIcon className="size-[18px]" />
            </Button>
          </ActionTooltip>
        )}
      </section>
    </article>
  );
};
