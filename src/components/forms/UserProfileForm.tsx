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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { BASE_URL } from '@/lib/constants';
import { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Calendar } from '../ui/calendar';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  avatarUrl: z.string(),
  username: z.string().min(4).max(20),
  email: z.string().email().max(30),
  dob: z.date().optional().or(z.literal(undefined)),
  bio: z.string().min(4).max(40).optional().or(z.literal('')),
  location: z.string().min(4).max(40).optional().or(z.literal('')),
});
interface UserProfileFormProps {
  user: User;
}

export const UserProfileForm = ({ user }: UserProfileFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatarUrl: '',
      username: '',
      email: '',
      dob: undefined,
      bio: '',
      location: '',
    },
  });
  useEffect(() => {
    form.setValue('avatarUrl', user.avatarUrl as string);

    form.setValue('email', user.email);
    form.setValue('username', user.username as string);
    if (user.bio || user.location || user.dateOfBirth) {
      form.setValue('bio', user.bio);
      form.setValue('dob', user.dateOfBirth);
      form.setValue('location', user.location);
    }
  }, [user]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col ">
        <section className="flex   gap-2 items-center md:p-4 p-3">
          <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <img
                    className="rounded-full max-h-[150px] max-w-[150px]"
                    src={`${BASE_URL}${field.value}`}
                    alt=""
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="w-full" placeholder="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
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
                      captionLayout="dropdown-buttons"
                      fromYear={1950}
                      toYear={2024}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
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
                  <Textarea className="resize-none" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="flex justify-end   md:p-6 p-3 gap-3 border-t w-full">
          <Button className="rounded-full" variant={'outline'}>
            Cancel
          </Button>
          <Button className="rounded-full">Save</Button>
        </section>
      </form>
    </Form>
  );
};
