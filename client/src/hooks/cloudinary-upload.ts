import { useState } from 'react'

interface UseCloudinaryUploadReturn {
  cloudinaryUrl: string | null;
  uploading: boolean;
  error: string | null;
  uploadImage: (file: File) => Promise<void>;
}

export const useCloudinaryUpload = (): UseCloudinaryUploadReturn => {
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my_blog'); // 👉 Заменить на свой пресет, если нужно

    setUploading(true);
    setError(null);

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dxn291kfd/image/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (result.secure_url) {
        setCloudinaryUrl(result.secure_url);
      } else {
        throw new Error(result.error?.message || 'Unknown upload error');
      }
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return {
    cloudinaryUrl,
    uploading,
    error,
    uploadImage,
  };
};
