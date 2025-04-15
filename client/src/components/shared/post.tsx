import { MdOutlineDelete, MdEdit, MdComment, MdRemoveRedEye, MdLabelImportantOutline, MdOutlineCategory } from "react-icons/md";

import { FC } from 'react';
import clsx from 'clsx';
import { Link} from 'react-router-dom';
import { UserInfo } from './user-info';


interface PostProps {
  id: string;
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
  deletePost: (id: string) => void;
  children?: React.ReactNode;
  isFullPost?: boolean;
  isLoading?: boolean;
  isEditable?: boolean;
}

export const Post:FC<PostProps> = ({
  id,
    title,
  category,
  createdAt,
    imageUrl,
    slug,
  user,
  viewsCount,
  commentsCount,
  tags,
  deletePost,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  if (isLoading) {
    return <div>skeleton</div>;
  }



  const onClickRemove = () => {
    deletePost(id);
  };
  return (
   <div className={`bg-white border border-[#dedede] rounded-lg overflow-hidden mb-4 relative ${isFullPost ? 'hover:border-[#4361ee] hover:shadow-md' : ''}`}>
      {isEditable && (
        <div className="absolute right-4 top-4 bg-white rounded-xl opacity-0 transition-opacity duration-150 ease-in-out hover:opacity-100">
          <Link to={`/posts/${slug}/edit`}>
              <MdEdit />
          </Link>
            <MdOutlineDelete onClick={onClickRemove}/>
        </div>
          )}
          
      {imageUrl && (
       <img
  className={clsx('w-full h-[300px] object-cover', { 'h-auto max-h-[600px] object-cover': isFullPost })}
  src={imageUrl}
  alt={title}
/>
      )}
      <div className="p-5 dark:bg-slate-800 dark:text-white relative">
        <UserInfo {...user} additionalText={createdAt} />
        <div className='pl-10'>
          <h2 className={`text-2xl ${isFullPost ? 'text-4xl font-extrabold' : ''} mb-2`}>
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
              <MdLabelImportantOutline className="h-5 w-5"  />
              <span>{category}</span>
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
              <div className="absolute flex gap-2 justify-center items-center right-2 top-2 bg-slate-100 p-2 text-lg rounded-xl dark:bg-slate-600 text-slate-600 dark:text-slate-200">
                  < MdOutlineCategory className="h-6 w-6 text-slate-600 dark:text-slate-200"/> {category}   
              </div>
    </div>
  );
};
