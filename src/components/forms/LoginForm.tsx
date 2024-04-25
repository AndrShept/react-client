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
import { useLazyCurrentQuery, useLoginMutation } from '@/lib/services/userApi';
import { ErrorMessage } from '@/lib/types';
import { hasErrorField } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { EyeIconForm } from '../icons/EyeIconForm';
import { Label } from '../ui/label';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export function LoginForm() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [isShow, setIsShow] = useState(false);
  const [queryError, setQueryError] = useState('');
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await login(values).unwrap();
      if (res.token) {
        await triggerCurrentQuery().unwrap();
        navigate('/');
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setQueryError(error.data.message);
        setTimeout(() => {
          setQueryError('');
        }, 4000);
      } else {
        toast.error('Something went wrong');
      }
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
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
                <div className="relative ">
                  <Input
                    className="pr-8"
                    type={isShow ? 'text' : 'password'}
                    placeholder="password"
                    {...field}
                  />

                  <EyeIconForm
                    isShow={isShow}
                    setIsShow={() => setIsShow((prev) => !prev)}
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {queryError && <p className="text-rose-500 text-sm ">{queryError}</p>}
        <Button disabled={isLoading} className="rounded-full   " type="submit">
          Login
        </Button>
        <div className="flex items-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?
          </p>
          <Button className="text-blue-400 p-2" asChild variant={'link'}>
            <Link to="/register">register</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
