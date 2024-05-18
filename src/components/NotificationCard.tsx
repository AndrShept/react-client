import {
  useLazyGetNotificationsQuery,
  useUpdateNotificationMutation,
} from '@/lib/services/notificationApi';
import { Notification, NotificationType } from '@/lib/types';
import { dateFnsLessTime } from '@/lib/utils';
import { CheckIcon, ExternalLinkIcon, LucideIcon } from 'lucide-react';
import {
  HeartIcon,
  MailPlusIcon,
  MessageSquareWarningIcon,
  NewspaperIcon,
} from 'lucide-react';
import { toast } from 'sonner';

import { ActionTooltip } from './ActionTooltip';
import { UserAvatar } from './UserAvatar';
import { Button } from './ui/button';

interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const [checkNotification, { isLoading }] = useUpdateNotificationMutation();
  const [refetchNotifications] = useLazyGetNotificationsQuery();

  const onCheck = async () => {
    try {
      await checkNotification(notification.id).unwrap();
      await refetchNotifications().unwrap();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const iconType: { [key in NotificationType]: LucideIcon } = {
    [NotificationType.Post]: NewspaperIcon,
    [NotificationType.Message]: MailPlusIcon,
    [NotificationType.Like]: HeartIcon,
    [NotificationType.Comment]: MessageSquareWarningIcon,
  };

  const notificationMessage: {
    [key in NotificationType]: string;
  } = {
    comment: `your post`,
    like: `liked your ${notification.type}`,
    message: `send new message`,
    post: `create new post`,
  };
  const NotificationIcon = iconType[notification.type];
  return (
    <article className=" p-2  border-transparent transition hover:border-muted-foreground border flex flex-col  text-sm gap-y-2">
      <section className="flex gap-x-2 items-center">
        <div className="relative flex items-center">
          <UserAvatar
            avatarUrl={notification.author?.avatarUrl}
            isOnline={notification.author?.isOnline!}
            username={notification.author?.username}
          />
          <div className=" -right-1 -bottom-1 scale-[85%] absolute size-[24px]  rounded-full flex items-center justify-center bg-red-400">
            <NotificationIcon className="size-4" />
          </div>
        </div>

        <div className="flex flex-col text-muted-foreground ">
          <p>
            <span className="text-primary font-semibold">
              {notification.author?.username}{' '}
            </span>
            {notificationMessage[notification.type]}
          </p>
          <time className="break-all line-clamp-1 text-xs">
            {dateFnsLessTime(notification.createdAt)}
          </time>
        </div>
        {!notification.isRead && (
          <div className="size-2 rounded-full bg-blue-400 ml-auto" />
        )}
      </section>
      <section className="text-muted-foreground flex items-center gap-x-[1px] ml-auto">
        <ActionTooltip label="Go to">
          <Button variant={'ghost'} size={'icon'} className="size-6">
            <ExternalLinkIcon className="size-[18px]" />
          </Button>
        </ActionTooltip>

        <ActionTooltip label='Check'>
          <Button
            disabled={isLoading || notification.isRead}
            onClick={onCheck}
            variant={'ghost'}
            size={'icon'}
            className="size-6"
          >
            <CheckIcon className="size-[18px]" />
          </Button>
        </ActionTooltip>
      </section>
    </article>
  );
};
