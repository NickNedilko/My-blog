import { Pagination as FlowbitePagination } from 'flowbite-react';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalItems: number;
  limit: number;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({
  page,
  setPage,
  totalItems,
  limit,
  className,
}) => {
  const { t } = useTranslation();

  const totalPages = Math.max(1, Math.ceil((totalItems || 0) / (limit || 1)));

  if (totalPages < 2) return null;

  return (
    <div
      className={`flex justify-center items-center gap-4 border-t pt-2 ${className || ''}`}
    >
      <FlowbitePagination
        layout="navigation"
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        showIcons
      />
      <span className="text-sm text-gray-500">
        {t('pagination.page_info', {
          current: page,
          total: totalPages,
        })}
      </span>
    </div>
  );
};

export default memo(Pagination);
