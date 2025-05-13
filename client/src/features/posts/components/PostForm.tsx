import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import { IoIosClose } from 'react-icons/io';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { FC, useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '../api/mutations/post-mutation';
import { getOnePost } from '../api/postApi';
import { Post } from '../../../shared/types';
import { Title } from '../../../shared/components/Title';
import { useCloudinaryUpload } from '../../user/hooks/cloudinary-upload';

interface PostFormProps {
  slug?: string;
}

export const PostForm: FC<PostFormProps> = ({ slug }) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, cloudinaryUrl } = useCloudinaryUpload();
  const [imageUrl, setImageUrl] = useState<string | null>('');
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('uncategorized');
  const { mutate: createPost } = useCreatePostMutation();
  const { t } = useTranslation();
  const { mutate: updatePost } = useUpdatePostMutation();

  const { data: post } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getOnePost(slug as string),
    enabled: !!slug,
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
    await uploadImage(file as File);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData: Partial<Post> = {
      title,
      content,
      category,
      tags,
      imageUrl: cloudinaryUrl || imageUrl || '',
    };

    if (slug && post) {
      updatePost({ slug, data: postData });
    } else {
      createPost(postData);
    }
    navigate('/dashboard?tab=my-posts');
  };

  useEffect(() => {
    if (slug) {
      setTitle(post?.title || '');
      setContent(post?.content || '');
      setTags(post?.tags || []);
      setCategory(post?.category || 'uncategorized');
      setImageUrl(post?.imageUrl || '');
    }
  }, [slug, post]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 max-w-3xl mx-auto min-h-screen md:w-[600px] xl:w-[768px]"
    >
      <Title
        text={post?.title || t('titles.create_post')}
        size="lg"
        className="text-center mb-3"
      />
      {imageUrl ? (
        <div className="relative flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 mb-3">
          <img
            src={imageUrl}
            alt="preview"
            className="w-full h-1/2 object-cover"
          />
          <IoIosClose
            onClick={() => setImageUrl(null)}
            className="absolute top-2 right-2 text-3xl text-red-500 cursor-pointer"
          />
        </div>
      ) : (
        <Button
          onClick={() => inputRef.current?.click()}
          type="button"
          outline
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-blue-500 mb-3"
        >
          {t('buttons.upload_image')}
        </Button>
      )}
      <FileInput
        ref={inputRef}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            className="flex-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder={t('placeholders.title')}
            required
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Uncotegorized">
              {t('categories.uncategorized')}
            </option>
            <option value="Development">{t('categories.development')}</option>
            <option value="Sport">{t('categories.sport')}</option>
            <option value="Films">{t('categories.films')}</option>
            <option value="Other">{t('categories.other')}</option>
          </Select>
        </div>
        <TextInput
          value={tags.join(',')}
          onChange={(e) => setTags((e.target.value as string).split(','))}
          className="flex-1"
          type="text"
          placeholder={t('placeholders.tags')}
          required
        />
        <div className="border-2 border-gray-300 rounded-lg p-3">
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            placeholder={t('placeholders.content')}
            className="h-[250px] w-[320px] md:w-full mb-16 md:mb-12"
          />
        </div>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-pink-500 
                transition-all duration-300  hover:from-pink-500 hover:to-blue-500 mt-2"
        >
          {slug ? t('buttons.edit_post') : t('buttons.create_post')}
        </Button>
      </div>
    </form>
  );
};
