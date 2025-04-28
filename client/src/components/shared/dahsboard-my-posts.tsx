import { useQuery } from '@tanstack/react-query';
import { TabItem, Tabs } from 'flowbite-react';
import { FaRegNewspaper } from 'react-icons/fa';
import { TbChartBarPopular } from 'react-icons/tb';
import { PostSkeleton } from './post-skeleton';
import { Post } from './post';
import { formateDate } from '../../lib/formate-data';
import { getMyPosts } from '../../services/postApi';
import { useAuthStore } from '../../store/auth-store';

import noPosts from '../../assets/no-posts.webp';
import { Link } from 'react-router-dom';

export const MyPosts = () => {
  const { user } = useAuthStore();
  const { data: posts, isLoading } = useQuery({
    queryKey: ['my-posts'],
    queryFn: getMyPosts,
    refetchOnWindowFocus: true,
  });

  if (posts?.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-40">
        <img src={noPosts} alt="No posts" />
        <p className="text-gray-500 text-2xl text-center">
          You have no posts yet.{' '}
          <Link to="?tab=create-post">
            <span className="text-[#4361ee]">Create one</span>
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-40">
      <Tabs aria-label="Tabs with underline" variant="underline">
        <TabItem active title="New" icon={FaRegNewspaper} />
        <TabItem active title="Popular" icon={TbChartBarPopular} />
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
                  createdAt={formateDate(post.createdAt)}
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
