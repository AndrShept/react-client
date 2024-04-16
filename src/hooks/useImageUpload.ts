import { useState } from 'react';
import { toast } from 'sonner';

export const useImageUpload = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
    errorMessage,
    setImageUrl,
    imageUrl,
    handleUpload,
  };
};
