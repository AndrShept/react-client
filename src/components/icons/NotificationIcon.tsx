import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  useClearAllNotificationsMutation,
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
} from '@/lib/services/notificationApi';
import { BellIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { NotificationCard } from '../NotificationCard';
import { Spinner } from '../Spinner';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

export const NotificationIcon = () => {
  const { data: notifications, isLoading } = useGetNotificationsQuery();
  const [refetchNotifications] = useLazyGetNotificationsQuery();
  const [onAllClear, { isLoading: isLoadingClear }] =
    useClearAllNotificationsMutation();
  const isNewNotification = notifications?.some(
    (notification) => notification.isRead === false,
  );
  const onClear = async () => {
    try {
      if (confirm()) {
        await onAllClear().unwrap();
        await refetchNotifications().unwrap();
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  useEffect(() => {
    const refetchInterval = setInterval(() => refetchNotifications(), 100000);
    return () => clearInterval(refetchInterval);
  }, []);
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="size-9 relative" variant={'ghost'} size={'icon'}>
          <BellIcon className="size-[19px]" />
          {isNewNotification && (
            <div className="size-[9px] ring-2 ring-secondary absolute right-1 bottom-1 rounded-full text-[9px] bg-red-500 animate-bounce" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0   ">
        {isLoading && (
          <div className="m-auto">
            <Spinner />
          </div>
        )}

        <div className="flex flex-col  gap-y-2">
          <ScrollArea className="pr-2">
            <ul className="flex flex-col  min-h-[70px] max-h-[50vh] ">
              {!notifications?.length && !isLoading && (
                <p className="text-muted-foreground text-center text-[13px] m-auto">
                  notifications not found
                </p>
              )}
              {!isLoading &&
                notifications?.map((notification) => (
                  <NotificationCard notification={notification} />
                ))}
            </ul>
          </ScrollArea>
          {!!notifications?.length && (
            <Button
              disabled={isLoadingClear}
              onClick={onClear}
              variant={'destructive'}
              className="rounded-t-none mt-auto"
              size={'sm'}
            >
              Clear all notifications
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
