import { FaHashtag } from 'react-icons/fa6';
import { FC } from 'react';
import { ListGroup, ListGroupItem } from 'flowbite-react';
import { Title } from './title';
import { useTranslation } from 'react-i18next';

interface TagsBlockProps {
  items: string[];
  isLoading?: boolean;
}

export const TagsBlock: FC<TagsBlockProps> = ({ items, isLoading = true }) => {
  const { t } = useTranslation();
  return (
    <div className="p-4 dark:bg-slate-800 rounded shadow-md">
      <Title text={t('titles.tags')} size="sm" className="mb-4" />
      <ListGroup>
        {(isLoading ? Array.from({ length: 5 }) : items).map((name, i) => (
          <ListGroupItem
            key={i}
            className="flex items-center justify-between p-2 border-b border-gray-200"
          >
            <a
              href={isLoading ? '#' : `/tags/${name}`}
              className="flex items-center gap-2 text-black dark:text-white hover:text-blue-600"
            >
              <FaHashtag className="text-gray-500" />
              {isLoading ? (
                <div className="w-24 h-4 bg-gray-300 rounded animate-pulse" />
              ) : (
                <span>{name as string}</span>
              )}
            </a>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};
