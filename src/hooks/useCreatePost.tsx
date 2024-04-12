import {
  useAddPostMutation,
  useLazyGetAllPostsQuery,
} from '@/lib/services/postApi';
import { dateNowFns } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';


export const postFormSchema = z.object({
  content: z.string().min(5),
  imageUrl: z.string(),
});

export const useCreatePost = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [addPost, { isLoading }] = useAddPostMutation();
  const [refetch] = useLazyGetAllPostsQuery();
  const [errorMessage, setErrorMessage] = useState('');
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: '',
      imageUrl: '',
    },
  });

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    try {
      await addPost(values).unwrap();

      toast.success('Post created!', {
        description: dateNowFns(),
      });
      refetch();
      form.reset({ content: '', imageUrl: '' });
      setImageUrl('');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files) {
      formData.append('file', e.target.files[0]);

      try {
        const res = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (res.ok) {
          setImageUrl(data.imageUrl);
          form.setValue('imageUrl', data.imageUrl);
        }
        if ('message' in data) {
          setErrorMessage(data.message as string);
          setTimeout(() => setErrorMessage(''), 3000);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    }
  };
  return {
    form,
    handleChange,
    onSubmit,
    isLoading,
    imageUrl,
    setImageUrl,
    errorMessage,
  };
};
