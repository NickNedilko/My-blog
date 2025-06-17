import { useState } from 'react';
import { PostTabs } from '../components/PostTabs';
import { useTranslation } from 'react-i18next';
import PostList from '../components/PostList';

import { TagsBlock } from '../components/TagsBlock';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../api/postApi';

import { CommentsBlock } from '../../comments/components/CommentsBlock';
import { getComments } from '../../comments/api/commentApi';
import Pagination from '../../../shared/components/Pagination';

const PostsPage = () => {
  const limit = 5;
  const [page, setPage] = useState(1);
  const { i18n } = useTranslation();
  const [tab, setTab] = useState('new');
  
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
    <div className="w-full px-4 md:px-8 lg:px-40 mb-4">
      <PostTabs tab={tab} setTab={setTab} setPage={setPage} />
      <div className="flex flex-wrap mt-4">
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <PostList
            posts={data?.posts || []}
            isLoading={isLoading}
            lang={i18n.language}
          />
          <Pagination
            page={page}
            setPage={setPage}
            totalItems={data?.totalPosts || 0}
            limit={limit}
          />
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
