import { Button, buttonVariants } from '@/components/ui/button';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useImageUpload } from '@/hooks/useImageUpload';
import { BASE_URL } from '@/lib/constants';
import {
  useLazyGetUserByIdQuery,
  useLazyGetUserByUsernameQuery,
  useUpdateUserMutation,
} from '@/lib/services/userApi';
import { User } from '@/lib/types';
import { cn, hasErrorField } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, ImageIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { nullable, z } from 'zod';

import { Calendar } from '../ui/calendar';
import { DialogClose } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  avatarUrl: z.string(),
  username: z.string().min(4).max(20),
  // email: z.string().email().max(30),
  dateOfBirth: z.date().optional().or(z.literal(null)),
  bio: z.string().min(4).max(120).optional().or(z.literal('')),
  location: z.string().min(4).max(20).optional().or(z.literal('')),
});
interface UserProfileFormProps {
  user: User;
}

export const UserProfileEditForm = ({ user }: UserProfileFormProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  console.log(user);
  const navigate = useNavigate();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [refetchUser] = useLazyGetUserByUsernameQuery();
  const { errorMessage, handleUpload, imageUrl, setImageUrl } =
    useImageUpload();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue('avatarUrl', user.avatarUrl as string);

    // form.setValue('email', user.email);
    form.setValue('username', user.username as string);
    // form.setValue('bio', user.bio as string);
    // form.setValue('location', user.location as string);
    form.setValue(
      'dateOfBirth',
      user.dateOfBirth ? new Date(user.dateOfBirth) : null,
    );
    if (imageUrl) {
      form.setValue('avatarUrl', imageUrl);
    }
    if (user.bio || user.location) {
      form.setValue('bio', user.bio);
      form.setValue('location', user.location);
    }

    if (errorMessage) {
      form.setError('avatarUrl', { message: errorMessage });
    }
  }, [user, imageUrl, errorMessage]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const isUsername = values.username === user.username;

    try {
      const updatedUser = await updateUser({
        id: user.id,
        userData: isUsername ? { ...values, username: undefined } : values,
      }).unwrap();
      await refetchUser(updatedUser.username as string).unwrap();

      toast.success('profile success updated');
      navigate(`/users/${updatedUser.username}`);

      ref.current?.click();
    } catch (error) {
      toast.error('Something went wrong');

      if (hasErrorField(error)) {
        // form.setError('email', { message: error.data.message });
        form.setError('username', { message: error.data.message });
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col ">
        <section className="flex gap-2  md:p-4 p-3">
          <div className="flex flex-col gap-2 ">
            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className=" h-[150px] w-[150px]">
                        <img
                          className="object-cover  rounded-full  size-full"
                          src={
                            imageUrl
                              ? `${BASE_URL}${imageUrl}`
                              : `${BASE_URL}${field.value}`
                          }
                          alt="avatar_img"
                        />
                      </div>

                      {imageUrl && (
                        <Button
                          onClick={() => setImageUrl('')}
                          className="rounded-full absolute right-0 top-2 size-7"
                          variant={'destructive'}
                          size={'icon'}
                        >
                          <X className="size-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <label
              aria-disabled={!!imageUrl}
              className={buttonVariants({
                size: 'sm',
                variant: 'default',
                className: 'scale-90',
              })}
              htmlFor="file"
            >
              <ImageIcon className="mr-1 size-5" />
              Change avatar
            </label>
            <input
              className="disabled:bg-red-300"
              disabled={!!imageUrl}
              hidden
              id="file"
              accept="image/*"
              onChange={handleUpload}
              type="file"
            />
            {/* {errorMessage && <p>{errorMessage}</p>} */}
          </div>

          <div className="p-2 flex md:flex-row flex-col  gap-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input className="" placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading || true}
                      className="w-full"
                      placeholder="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
        </section>
        <section className="flex flex-col md:p-4 p-3 gap-3 ">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'dd-MM-yyyy')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto  p-0" align="start">
                      <Calendar
                        className="relative"
                        captionLayout="dropdown-buttons"
                        fromYear={1950}
                        toYear={2018}
                        mode="single"
                        //@ts-ignore
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button
                    className="rounded-full size-8 ml-1"
                    onClick={() => form.setValue('dateOfBirth', null)}
                    variant={'ghost'}
                    size={'icon'}
                    type="button"
                  >
                    X
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="flex justify-end   md:p-6 p-3 gap-3  w-full">
          <DialogClose ref={ref}>
            <Button
              type="button"
              disabled={isLoading}
              className="rounded-full"
              variant={'outline'}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button disabled={isLoading} className="rounded-full">
            Save
          </Button>
        </section>
      </form>
    </Form>
  );
};
