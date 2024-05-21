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
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigation2 } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { EmojiButton } from '../EmojiButton';

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
    console.log(values)
    console.log(postId)
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
                <div className="flex ">
                  <div className="relative  w-full">
                    <Input
                      className="pr-9 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none"
                      disabled={isLoading}
                      placeholder="comment..."
                      {...field}
                    />
                    <EmojiButton
                      align="end"
                      alignOffset={-20}
                      sideOffset={60}
                      isLoading={isLoading}
                      onChange={(emoji) =>
                        field.onChange(`${field.value}${emoji}`)
                      }
                      classname="right-2 top-[10px]"
                    />
                  </div>

                  <Button
                    variant={'secondary'}
                    size={'icon'}
                    disabled={isLoading}
                    type="submit"
                    className="rounded-l-none"
                  >
                    <Navigation2 className="rotate-90" />
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
