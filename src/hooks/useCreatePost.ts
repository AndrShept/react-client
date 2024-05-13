import {
  useAddPostMutation,
  useLazyGetAllPostsQuery,
} from '@/lib/services/postApi';
import { dateNowFns } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useFileUpload } from './useFileUpload';

export const postFormSchema = z.object({
  content: z.string().min(5),
  imageUrl: z.string(),
});

export const useCreatePost = () => {
  const { errorMessage, handleUpload, imageUrl, setImageUrl } =
  useFileUpload();

  const [addPost, { isLoading }] = useAddPostMutation();
  const [refetch] = useLazyGetAllPostsQuery();
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: '',
      imageUrl: '',
    },
  });
  useEffect(() => {
    form.setValue('imageUrl', imageUrl);
  }, [imageUrl]);
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

  return {
    form,
    onSubmit,
    isLoading,
    errorMessage,
    handleUpload,
    imageUrl,
    setImageUrl,
  };
};
