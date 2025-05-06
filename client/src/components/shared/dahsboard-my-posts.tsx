import { useQuery } from '@tanstack/react-query';
import { TabItem, Tabs } from 'flowbite-react';
import { FaRegNewspaper } from 'react-icons/fa';
import { TbChartBarPopular } from 'react-icons/tb';
import { PostSkeleton } from './post-skeleton';
import { Post } from './post';
import { getMyPosts } from '../../services/postApi';
import { useAuthStore } from '../../store/auth-store';
import NotFound from './not-found';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../lib/format-data';

export const MyPosts = () => {
  const { user } = useAuthStore();
  const { t, i18n } = useTranslation();
  const { data: posts, isLoading } = useQuery({
    queryKey: ['my-posts'],
    queryFn: getMyPosts,
    refetchOnWindowFocus: true,
  });

  if (posts?.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-40">
        <NotFound />
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-40">
      <Tabs aria-label="Tabs with underline" variant="underline">
        <TabItem active title={t('titles.new_posts')} icon={FaRegNewspaper} />
        <TabItem
          active
          title={t('titles.popular_posts')}
          icon={TbChartBarPopular}
        />
      </Tabs>
      <div className="flex flex-wrap mt-4">
        <div className="w-full md:w-2/3 flex mx-auto  flex-col gap-6">
          {isLoading
            ? [...Array(2)].map((_, i) => <PostSkeleton key={i} />)
            : posts?.map((post) => (
                <Post
                  key={post._id}
                  title={post.title}
                  imageUrl={post.imageUrl}
                  user={post.user}
                  createdAt={formatDate(post.createdAt, i18n.language)}
                  viewsCount={post.viewsCount}
                  commentsCount={post.commentCount}
                  slug={post.slug}
                  category={post.category}
                  tags={post.tags}
                  isEditable={user?._id === post.user._id}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
