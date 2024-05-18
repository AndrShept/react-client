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
import { toast } from 'sonner';

import { NotificationCard } from '../NotificationCard';
import { Spinner } from '../Spinner';
import { Button } from '../ui/button';

export const NotificationIcon = () => {
  const { data: notifications, isLoading } = useGetNotificationsQuery();
  const [refetchNotifications] = useLazyGetNotificationsQuery();
  const [onAllClear, { isLoading: isLoadingClear }] =
    useClearAllNotificationsMutation();

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
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="size-9" variant={'ghost'} size={'icon'}>
          <BellIcon className="size-[21px]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 min-h-[200px] min-w-[300px] flex flex-col">
        {!notifications?.length && !isLoading && (
          <p className="text-muted-foreground text-center text-sm m-auto">
            notifications not found
          </p>
        )}
        {isLoading && (
          <div className='m-auto'>
            <Spinner />
          </div>
        )}

        {!!notifications?.length && (
          <ul className="flex flex-col gap-y-2">
            {!isLoading &&
              notifications?.map((notification) => (
                <NotificationCard notification={notification} />
              ))}
            <Button
              disabled={isLoadingClear}
              onClick={onClear}
              variant={'destructive'}
              className="rounded-t-none"
              size={'sm'}
            >
              Clear all notifications
            </Button>
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
};
