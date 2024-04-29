import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  useAddCommentMutation,
  useLazyGetCommentsQuery,
} from '@/lib/services/commentApi';
import { useLazyGetPostByIdQuery } from '@/lib/services/postApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucideSendHorizontal } from 'lucide-react';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  content: z.string().min(5).max(170),
});

interface PostCommentsFormProps {
  postId: string;
}

export const PostCommentsForm = ({ postId }: PostCommentsFormProps) => {
  const [addComment, { isLoading }] = useAddCommentMutation();
  const [refetchComments] = useLazyGetCommentsQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addComment({ ...values, postId }).unwrap();
      refetchComments(postId).unwrap();
      toast.success('Add new comment');
      form.reset();
      form.setFocus('content');
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
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <div className="flex">
                  <Input
                    className=" focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none"
                    disabled={isLoading}
                    placeholder="comment..."
                    {...field}
                  />
                  <Button
                    variant={'secondary'}
                    size={'icon'}
                    disabled={isLoading}
                    type="submit"
                    className="rounded-l-none"
                  >
                    <LucideSendHorizontal />
                  </Button>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
