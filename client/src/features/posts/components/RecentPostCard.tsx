import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { Post } from '../../../shared/types';

export const RecentPostCard: FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();
  const categoryKey = post.category.toLowerCase();
  return (
    <li className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all mx-auto">
      <Link to={`/posts/${post.slug}`}>
        <img
          src={post.imageUrl}
          alt="post cover"
          className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{t(`categories.${categoryKey}`)}</span>
        <ul className="flex flex-wrap gap-3 mb-2">
          {post.tags.map((name) => (
            <li key={name}>
              <a href={`/tag/${name}`}>#{name}</a>
            </li>
          ))}
        </ul>
        <Link
          to={`/posts/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          {t('navigation.read_article')}
        </Link>
      </div>
    </li>
  );
};
