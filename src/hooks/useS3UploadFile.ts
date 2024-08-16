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
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File  cannot be larger than 10mb');
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
