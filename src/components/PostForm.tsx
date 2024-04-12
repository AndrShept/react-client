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
import { useCreatePost } from '@/hooks/useCreatePost';
import { BASE_URL } from '@/lib/constants';
import { ImageIcon, X } from 'lucide-react';

import { Label } from './ui/label';

export const PostForm = () => {
  const {
    form,
    handleChange,
    onSubmit,
    imageUrl,
    isLoading,
    setImageUrl,
    errorMessage,
  } = useCreatePost();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex  flex-col max-w-[800px]  min-w-[300px bg-secondary/50 p-8 rounded-lg "
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <Label>Create post</Label>
              <FormControl>
                <Input placeholder="content..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="self-end flex items-center gap-2">
          {errorMessage && (
            <p className="text-rose-500 text-sm"> {errorMessage}</p>
          )}
          <label
            className="cursor-pointer p-2 hover:bg-secondary/60 opacity-80 hover:opacity-100 transition rounded-full "
            htmlFor="image"
          >
            <ImageIcon className="size-5" />
          </label>

          <Button disabled={isLoading} className="rounded-full " type="submit">
            Post
          </Button>
        </div>
        {imageUrl && (
          <div className="relative">
            <img src={`${BASE_URL}${imageUrl}`} className="h-full w-full" />
            <Button
              onClick={() => setImageUrl('')}
              variant={'secondary'}
              size={'icon'}
              className="absolute top-2 right-2 rounded-full"
            >
              <X />
            </Button>
          </div>
        )}
      </form>
      <input onChange={handleChange} hidden id="image" type="file" />
    </Form>
  );
};
