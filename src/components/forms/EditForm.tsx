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
import { useLazyGetPostByIdQuery } from '@/lib/services/postApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  content: z.string().min(5).max(200),
});

interface EditFormProps {
  content: string;
  commentId: string;
  postId: string;
  setIsEdit: (bool: boolean) => void;
}

export const EditForm = ({
  content,
  commentId,
  postId,
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
    try {
      await editComment({
        content: { ...values },
        id: commentId,
      }).unwrap();
      setIsEdit(false);
      await refetchComments(postId);
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
                <Input
                  disabled={isLoading}
                  className=" mt-4 min-w-[350px]"
                  placeholder="content"
                  {...field}
                />
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
