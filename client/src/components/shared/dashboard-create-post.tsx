import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import { IoIosClose } from 'react-icons/io';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Title } from './title';
import { FC, useEffect, useRef, useState } from 'react';
import { useCloudinaryUpload } from '../../hooks/cloudinary-upload';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '../../mutations/post-mutation';
import { Post } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { getOnePost } from '../../services/postApi';
import { useNavigate } from 'react-router-dom';

interface CreatePostProps {
  slug?: string;
}

export const CreatePost: FC<CreatePostProps> = ({ slug }) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, cloudinaryUrl } = useCloudinaryUpload();
  const [imageUrl, setImageUrl] = useState<string | null>('');
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('uncategorized');
  const { mutate: createPost } = useCreatePostMutation();

  const { mutate: updatePost } = useUpdatePostMutation();

  const { data: post } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getOnePost(slug as string),
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
        text={post?.title || 'Create post'}
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
          Upload image
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
            placeholder="Title"
            required
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Uncotegorized">Uncategorized</option>
            <option value="Development">Development</option>
            <option value="Sport">Sport</option>
            <option value="Films">Films</option>
            <option value="Other">Other</option>
          </Select>
        </div>
        <TextInput
          value={tags.join(',')}
          onChange={(e) => setTags((e.target.value as string).split(','))}
          className="flex-1"
          type="text"
          placeholder="Tags"
          required
        />
        <div className="border-2 border-gray-300 rounded-lg p-3">
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            placeholder="Write your post here..."
            className="h-[250px] w-[320px] md:w-full mb-16 md:mb-12"
          />
        </div>
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-500 mt-2"
        >
          {slug ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
};
