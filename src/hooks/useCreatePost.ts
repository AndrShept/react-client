import {
  useAddPostMutation,
  useLazyGetAllPostsQuery,
} from '@/lib/services/postApi';
import { dateNowFns } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useS3FileUpload } from './useS3UploadFile';

export const postFormSchema = z.object({
  content: z.string().min(5),
  fileUrl: z.string(),
});

export const useCreatePost = () => {
  const { fileState, handleUpload, setFileState, errorMessage } =
    useS3FileUpload();
  const [addPost, { isLoading }] = useAddPostMutation();
  const [refetch] = useLazyGetAllPostsQuery();
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: '',
      fileUrl: '',
    },
  });
  useEffect(() => {
    form.setValue('fileUrl', fileState?.url ?? '');
  }, [fileState]);
  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    const formData = new FormData();
    formData.append('content', values.content);
    if (fileState?.file) {
      formData.append('file', fileState.file);
    }
    try {
      await addPost(formData).unwrap();

      toast.success('Post created!', {
        description: dateNowFns(),
      });
      refetch();
      form.reset({ content: '', fileUrl: '' });
      setFileState(null);
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
    fileState,
    setFileState,
  };
};
