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
import { useRegisterMutation } from '@/lib/services/userApi';
import { ErrorMessage } from '@/lib/types';
import { dateNowFns } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { Label } from '../ui/label';

const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});

export function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation();
  const [queryError, setQueryError] = useState('');
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await register(values).unwrap();
      if (res) {
        toast.success(`Hello ${res.username} your account success created!`, {
          description: dateNowFns(),
        });
        navigate('/login');
      }
    } catch (error) {
      const err = error as ErrorMessage;
      setQueryError(err.data.message);
      setTimeout(() => {
        setQueryError('');
      }, 4000);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-w-[400px] md:min-w-[400px] min-w-[320px]  "
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Label>Username</Label>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
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
              <Label>Email</Label>
              <FormControl>
                <Input placeholder="example.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label>Password</Label>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {queryError && <p className="text-rose-500 text-sm ">{queryError}</p>}
        <Button disabled={isLoading} className="rounded-full" type="submit">
          Register
        </Button>
        <div className="flex items-center">
          <p className="text-sm text-muted-foreground">Login to account</p>
          <Button className="text-blue-400 p-2" asChild variant={'link'}>
            <Link to="/login">login</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
