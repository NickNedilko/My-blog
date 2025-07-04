import {
  MdOutlineDelete,
  MdEdit,
  MdComment,
  MdRemoveRedEye,
  MdLabelImportantOutline,
  MdOutlineCategory,
} from 'react-icons/md';

import { FC } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useDeletePostMutation } from '../api/mutations/post-mutation';
import { UserInfo } from '../../user/components/UserInfo';
import { useAuthStore } from '../../auth/model/auth-store';

interface PostProps {
  id?: string;
  title: string;
  category: string;
  createdAt: string;
  slug?: string;
  imageUrl?: string;
  user: {
    _id?: string;
    userName: string;
    avatarUrl: string;
  };
  viewsCount: number;
  commentsCount: number;
  tags: string[];

  children?: React.ReactNode;
  isFullPost?: boolean;
  isLoading?: boolean;
}

export const PostCard: FC<PostProps> = ({
  title,
  category,
  createdAt,
  imageUrl,
  slug,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,

}) => {
  const { t } = useTranslation();
  if (isLoading) {
    return <div>skeleton</div>;
  }
  const { user: currentUser } = useAuthStore();

  const isEditablePost = currentUser?._id === user?._id || currentUser?.isAdmin;

  const { mutate: deletePost } = useDeletePostMutation();
  const categoryKey = category.toLowerCase();
  const onClickRemove = () => {
    deletePost(slug as string);
  };
  return (
    <div
      className={`bg-white border border-[#dedede] rounded-lg overflow-hidden mb-4 relative ${isFullPost ? 'hover:border-[#4361ee] hover:shadow-md' : ''}`}
    >
      {isEditablePost  && (
        <div className="absolute flex right-4 top-4 p-3 gap-3 bg-slate-400 text-white text-xl rounded-xl ">
          <Link to={`/dashboard?tab=edit-post&slug=${slug}`}>
            <MdEdit />
          </Link>
          <MdOutlineDelete onClick={onClickRemove} className="cursor-pointer" />
        </div>
      )}

      {imageUrl && (
        <img
          className={clsx('w-full h-[300px] object-cover', {
            'h-auto max-h-[600px] object-cover': isFullPost,
          })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className="p-5 dark:bg-slate-800 dark:text-white relative">
        <UserInfo {...user} additionalText={createdAt} />
        <div className="pl-10">
          <h2
            className={`text-2xl line-clamp-2 ${isFullPost ? 'text-4xl font-extrabold' : ''} mb-2`}
          >
            {isFullPost ? title : <Link to={`/posts/${slug}`}>{title}</Link>}
          </h2>
          <ul className="flex flex-wrap gap-3 mb-2">
            {tags.map((name) => (
              <li key={name}>
                <a href={`/tag/${name}`}>#{name}</a>
              </li>
            ))}
          </ul>
          {children && <div className="my-8">{children}</div>}
          <ul className="flex space-x-6 mt-6 text-sm text-gray-600 dark:text-gray-200">
            <li className="flex items-center space-x-1 opacity-70 hover:opacity-100">
              <MdLabelImportantOutline className="h-5 w-5" />
              <span>{t(`categories.${categoryKey}`)}</span>
            </li>
            <li className="flex items-center space-x-1 opacity-70 hover:opacity-100">
              <MdRemoveRedEye className="h-5 w-5" />
              <span>{viewsCount}</span>
            </li>
            <li className="flex items-center space-x-1 opacity-70 hover:opacity-100">
              <MdComment className="h-5 w-5" />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="absolute flex gap-2 justify-center items-center left-4 top-4 bg-slate-100 p-2 text-lg rounded-xl dark:bg-slate-600 text-slate-600 dark:text-slate-200">
        <MdOutlineCategory className="h-6 w-6 text-slate-600 dark:text-slate-200" />
        {t(`categories.${categoryKey}`)}
      </div>
    </div>
  );
};
