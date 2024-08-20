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
import { useAuth } from '@/hooks/useAuth';
import { useCreatePost } from '@/hooks/useCreatePost';
import { ImageIcon, X } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserAvatar } from '../UserAvatar';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export const PostForm = () => {
  const { userData } = useAuth();

  if (!userData) {
    throw new Error('UserData not found');
  }
  const {
    form,
    handleUpload,
    onSubmit,
    isLoading,
    errorMessage,
    fileState,
    setFileState,
  } = useCreatePost();

  const fileUrl = fileState?.url;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col  p-7 rounded-lg text-center  "
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <Label className="text-indigo-500 ">Create post</Label>
              <FormControl>
                <div className="flex gap-2   ">
                  <UserAvatar
                    avatarUrl={userData.avatarUrl}
                    isOnline={userData.isOnline}
                    username={userData.username}
                  />
                  <Textarea
                    className="resize-none bg-secondary/30"
                    placeholder="content..."
                    {...field}
                  />
                </div>
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
        {fileUrl && fileState.file.type.startsWith('image/') && (
          <div className="relative">
            <img
              src={fileUrl}
              className="h-full w-full aspect-video object-cover"
            />
            <Button
              onClick={() => setFileState(null)}
              variant={'secondary'}
              size={'icon'}
              className="absolute top-2 right-2 rounded-full"
            >
              <X />
            </Button>
          </div>
        )}
        {fileUrl && fileState.file.type.startsWith('video/') && (
          <div className="relative">
            <video
              src={fileUrl}
              className="h-full w-full aspect-video object-cover"
              autoPlay
              muted
              loop
            />
            <Button
              onClick={() => setFileState(null)}
              variant={'secondary'}
              size={'icon'}
              className="absolute top-2 right-2 rounded-full"
            >
              <X />
            </Button>
          </div>
        )}
      </form>
      <input
        onChange={handleUpload}
        hidden
        id="image"
        accept="image/png, image/jpeg, video/mp4, video/webm"
        type="file"
      />
    </Form>
  );
};
