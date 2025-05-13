import { useState } from 'react';
import { PostTabs } from '../components/PostTabs';
import { useTranslation } from 'react-i18next';
import PostList from '../components/PostList';
import { Pagination } from 'flowbite-react';
import { TagsBlock } from '../components/TagsBlock';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../api/postApi';

import { CommentsBlock } from '../../comments/components/CommentsBlock';
import { getComments } from '../../comments/api/commentApi';
import { useAuthStore } from '../../auth/model/auth-store';

const PostsPage = () => {
  const limit = 5;
  const [page, setPage] = useState(1);
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState('new');
  const { user } = useAuthStore();
  const sortBy = tab === 'new' ? 'createdAt' : 'views';

  const { data, isLoading } = useQuery({
    queryKey: ['posts', page, sortBy],
    queryFn: () =>
      getAllPosts(page, limit, undefined, undefined, undefined, sortBy),
  });

  const { data: comments } = useQuery({
    queryKey: ['comments', page, limit],
    queryFn: () => getComments({ page, limit }),
  });

  return (
    <div className="w-full px-4 md:px-8 lg:px-40">
      <PostTabs tab={tab} setTab={setTab} setPage={setPage} />
      <div className="flex flex-wrap mt-4">
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <PostList
            posts={data?.posts || []}
            isLoading={isLoading}
            lang={i18n.language}
            isEditable={user?.isAdmin}
          />
          {!data ||
            (data?.totalPosts > limit && (
              <div className="flex justify-center items-center gap-4 mb-4 border-gray-400 border-t pt-2">
                <Pagination
                  layout="navigation"
                  currentPage={page}
                  totalPages={Math.ceil(data.totalPosts / limit)}
                  onPageChange={setPage}
                  showIcons
                />
                <span className="text-sm text-gray-500">
                  {t('pagination.page_info', {
                    current: page,
                    total: Math.ceil(data.totalPosts / limit),
                  })}
                </span>
              </div>
            ))}
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <TagsBlock
            items={(data?.tags as string[]) || []}
            isLoading={isLoading}
          />
          <CommentsBlock
            // @ts-ignore
            items={comments?.comments || []}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
