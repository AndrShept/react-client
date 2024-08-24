import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdatePasswordMutation } from '@/lib/services/userApi';
import { ErrorMessage } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
  .object({
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });

export const NewPasswordForm = () => {
  const [params] = useSearchParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const token = params.get('token');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) return;
    const { password } = values;
    try {
      const res = await updatePassword({
        newPassword: password,
        token,
      }).unwrap();
      if (res.success) {
        toast.success('Password success changed');
        navigate('/login');
      }

      console.log(res);
    } catch (error) {
      const err = error as ErrorMessage;
      setMessage(err.data.message);
      toast.error('Something went wrong');
    }
  }

  return (
    <div className="flex flex-col max-w-md gap-4 md:min-w-[448px] ">
      <h1>New Password</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Password
                </FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="confirm password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {message && <p className="text-sm text-red-500">{message}</p>}
          <div className="flex">
            <Button
              size={'icon'}
              onClick={() => navigate('/')}
              variant={'ghost'}
              type="button"
            >
              <ChevronLeftIcon />
            </Button>
            <Button disabled={isLoading} className="ml-auto" type="submit">
              Save password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
