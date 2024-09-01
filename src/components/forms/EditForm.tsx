import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  useEditCommentMutation,
  useLazyGetCommentsQuery,
} from '@/lib/services/commentApi';
import { useLazyGetReplysQuery } from '@/lib/services/replyApi';
import { Reply } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '../ui/button';

const formSchema = z.object({
  content: z.string().min(5).max(200),
});

interface EditFormProps {
  content: string;
  commentId: string;
  id: string;
  setIsEdit: (bool: boolean) => void;
}

export const EditForm = ({
  content,
  commentId,
  id,
  setIsEdit,
}: EditFormProps) => {
  const [editComment, { isLoading }] = useEditCommentMutation();
  const [refetchComments] = useLazyGetCommentsQuery();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '' || content,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      await editComment({
        content: { ...values },
        id: commentId,
      }).unwrap();
      setIsEdit(false);
      await refetchComments(id).unwrap();
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center mt-4 gap-x-1">
                  <Input
                    disabled={isLoading}
                    className="  min-w-[200px]"
                    placeholder="content"
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
                    onClick={() => setIsEdit(false)}
                    disabled={isLoading}
                    type="button"
                    className="size-7 hover:text-rose-500"
                    variant={'ghost'}
                    size={'icon'}
                  >
                    <X className="size-5" />
                  </Button>
                </div>
              </FormControl>

              <FormDescription className="text-xs">
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
