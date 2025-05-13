import { useQuery } from '@tanstack/react-query';
import PostList from '../../posts/components/PostList';
import { getMyPosts } from '../../posts/api/postApi';
import { NotFound } from '../../../shared/components/NotFound';

export const DashboardMyPosts = () => {
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
      <div className="flex flex-wrap mt-4">
        <div className="w-full md:w-2/3 flex mx-auto  flex-col gap-6">
          <PostList posts={posts || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
