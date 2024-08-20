import { useEffect, useState } from 'react';

interface IFile {
  name: string;
  size: number;
  url: string;
  file: File;
}

export const useS3FileUpload = () => {
  const [fileState, setFileState] = useState<null | IFile>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const isVideoFile = file.type.startsWith('video/');
    const isImageFile = file.type.startsWith('image/');
    if (file.size > 10 * 1024 * 1024 && isImageFile) {
      setErrorMessage('File image  cannot be larger than 10mb');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    if (file.size > 20 * 1024 * 1024 && isVideoFile) {
      setErrorMessage('File video  cannot be larger than 20mb');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    setFileState({
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      file,
    });
  };
  useEffect(() => {
    if (fileState) {
      return () => URL.revokeObjectURL(fileState.url);
    }
  }, [fileState]);

  return {
    fileState,
    handleUpload,
    setFileState,
    errorMessage,
  };
};
