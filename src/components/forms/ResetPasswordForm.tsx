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
import { useResetPasswordMutation } from '@/lib/services/userApi';
import { ErrorMessage } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [message, setMessage] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await resetPassword(values).unwrap();

      if (res.success) {
        toast.success(
          'Send you an email with instructions to reset your password.',
        );
        navigate('/login');
      }

    } catch (error) {
        console.log(error)
      const err = error as ErrorMessage;
      if (err.data.message) {
        setMessage(err.data.message);
        setTimeout(() => setMessage(''), 4000);
      }
      toast.error('Something went wrong');
    }
  }

  return (
    <div className="flex flex-col max-w-md gap-4 ">
      <h1>Reset password</h1>
      <p className="text-muted-foreground text-sm">
        Include the email address associated with your account and we’ll send
        you an email with instructions to reset your password.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">Email</FormLabel>
                <FormControl>
                  <Input placeholder="andr@example.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm text-red-500">{message}</p>
          <div className="flex">
            <Button
              size={'icon'}
              onClick={() => navigate(-1)}
              variant={'ghost'}
              type="button"
            >
              <ChevronLeftIcon />
            </Button>
            <Button disabled={isLoading} className="ml-auto" type="submit">
              Reset password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
