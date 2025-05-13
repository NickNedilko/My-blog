import { FaUserCircle } from 'react-icons/fa';
import { FC, Fragment } from 'react';
import { Avatar } from 'flowbite-react';
import moment from 'moment';

import { useTranslation } from 'react-i18next';
import { Title } from '../../../shared/components/Title';

interface CommentsBlockProps {
  items: any[];
  children?: React.ReactNode;
  isLoading?: boolean;
}

export const CommentsBlock: FC<CommentsBlockProps> = ({
  items,
  children,
  isLoading = true,
}) => {
  const { t } = useTranslation();
  return (
    <div className="p-4 dark:bg-slate-800 rounded shadow-md">
      <Title text={t('titles.comments')} size="sm" className="mb-4" />
      <ul className="divide-y divide-gray-200">
        {(isLoading ? Array.from({ length: 5 }) : items).map((obj, index) => (
          <Fragment key={index}>
            <li className="flex items-start space-x-4 py-4">
              <div className="flex-shrink-0">
                {isLoading ? (
                  <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
                ) : obj.user.avatarUrl ? (
                  <Avatar
                    img={obj.user.avatarUrl}
                    className="w-10 h-10"
                    rounded
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-400" />
                )}
              </div>

              <div className="flex flex-col gap-1">
                {isLoading ? (
                  <>
                    <div className="w-28 h-5 bg-gray-300 rounded animate-pulse" />
                    <div className="w-56 h-4 bg-gray-200 rounded animate-pulse" />
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {obj.user.userName || 'Deleted author'}{' '}
                      <span className="text-xs text-gray-400">
                        {moment(obj.createdAt).fromNow()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {obj.content}
                    </p>
                  </>
                )}
              </div>
            </li>
          </Fragment>
        ))}
      </ul>
      {children}
    </div>
  );
};
