import { useState } from 'react';
import { toast } from 'sonner';

export const useFileUpload = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fileInfo, setFileInfo] = useState({ name: '', size: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const formData = new FormData();
    const file = e.target.files[0];
    setFileInfo({ name: file.name, size: file.size });
    formData.append('file', file);

    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setIsLoading(false);
      if (res.ok) {
        setImageUrl(data.imageUrl);
      }
      if ('message' in data) {
        setErrorMessage(data.message as string);
        setTimeout(() => setErrorMessage(''), 5000);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  return {
    errorMessage,
    setImageUrl,
    imageUrl,
    fileInfo,
    setFileInfo,
    handleUpload,
    isLoading,
  };
};
