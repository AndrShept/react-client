import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLazyGetCommentsQuery } from '@/lib/services/commentApi';
import { useAddReplyMutation } from '@/lib/services/replyApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '../ui/button';

const formSchema = z.object({
  content: z.string().min(5).max(200),
});

interface EditFormProps {
  commentContent: {
    content: string;
    username: string;
  };
  authorUsername: string;
  commentId: string;
  id: string;

  setIsReply: (bool: boolean) => void;
}

export const ReplyForm = ({
  commentContent,
  commentId,
  authorUsername,
  setIsReply,
  id,
}: EditFormProps) => {
  const navigate = useNavigate();
  const [addReply, { isLoading }] = useAddReplyMutation();
  const [refetchComments] = useLazyGetCommentsQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addReply({
        commentId,
         id,
        ...values,
      }).unwrap();
      await refetchComments(id);
      setIsReply(false);
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <section className="flex ">
                  <div className="h-[57px] w-[30px]  border-l border-b ml-7 rounded-bl-md" />

                  <div className="flex flex-col flex-1">
                    <div className="flex items-center border rounded-t-lg mt-4 ">
                      <Button
                        className=" font-semibold text-sm text-indigo-500"
                        onClick={() => navigate(`/users/${authorUsername}`)}
                        variant={'link'}
                        type="button"
                      >
                        {authorUsername}
                      </Button>
                      <p className="break-all line-clamp-1 text-sm text-emerald-600">
                        {commentContent.content}
                      </p>
                    </div>
                    <div className="flex items-center  gap-x-1">
                      <Input
                        disabled={isLoading}
                        className="  min-w-[200px] bg-secondary/20 focus-visible:ring-0  rounded-t-none focus-visible:ring-offset-0 border-x border-b border-t-0"
                        placeholder='message...'
                        {...field}
                      />

                      <Button
                        disabled={isLoading}
                        type="submit"
                        className="size-7 ml-1"
                        variant={'ghost'}
                        size={'icon'}
                      >
                        <CheckIcon className="size-5 hover:text-green-500" />
                      </Button>
                      <Button
                        onClick={() => setIsReply(false)}
                        disabled={isLoading}
                        type="button"
                        className="size-7 hover:text-rose-500"
                        variant={'ghost'}
                        size={'icon'}
                      >
                        <X className="size-5" />
                      </Button>
                    </div>
                  </div>
                </section>
              </FormControl>

              <FormDescription className="text-xs ml-[41px]">
                Press{' '}
                <span className="text-emerald-500 font-semibold">ENTER</span> -
                confirm , and{' '}
                <span className="text-rose-500 font-semibold">ESC</span> -
                cancel
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
