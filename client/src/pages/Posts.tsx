import { Button, TabItem, Tabs } from 'flowbite-react';
import { FaRegNewspaper } from 'react-icons/fa';
import { TbChartBarPopular } from 'react-icons/tb';
import { TagsBlock } from '../components/shared/tags-block';
import { useQuery } from '@tanstack/react-query';
import { Post } from '../components/shared/post';
import { getAllPosts } from '../services/postApi';
import { formateDate } from '../lib/formate-data';
import { CommentsBlock } from '../components/shared/comments-block';
import { PostSkeleton } from '../components/shared/post-skeleton';
import { useAuthStore } from '../store/auth-store';
import { useState } from 'react';
import { getComments } from '../services/commentApi';

const Posts = () => {
  const limit = 5;
  const [page, setPage] = useState(1);
  const { user } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => getAllPosts(page),
  });

  const { data: comments } = useQuery({
    queryKey: ['comments', page, limit],
    queryFn: () => getComments({ page, limit }),
  });

  return (
    <div className="w-full px-4 md:px-8 lg:px-40">
      <Tabs aria-label="Tabs with underline" variant="underline">
        <TabItem active title="New" icon={FaRegNewspaper} />
        <TabItem active title="Popular" icon={TbChartBarPopular} />
      </Tabs>
      <div className="flex flex-wrap mt-4">
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {isLoading
            ? [...Array(2)].map((_, i) => <PostSkeleton key={i} />)
            : data?.posts.map((post) => (
                <Post
                  key={post._id}
                  id={post._id.toString()}
                  title={post.title}
                  imageUrl={post.imageUrl}
                  user={post.user}
                  createdAt={formateDate(post.createdAt)}
                  viewsCount={post.viewsCount}
                  commentsCount={post.commentCount}
                  slug={post.slug}
                  category={post.category}
                  tags={post.tags}
                  isEditable={user?.isAdmin}
                />
              ))}
          {!data ||
            (data?.totalPosts > limit && (
              <div className="flex justify-center gap-4 mb-4 border-gray-400 border-t pt-2">
                <Button
                  className="text-white font-semibold py-2 px-4 rounded bg-gradient-to-r from-blue-500 to-pink-500 
                transition-all duration-300  hover:from-pink-500 hover:to-blue-500"
                  outline
                  onClick={() => setPage((prev) => Math.max(prev - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  className="text-white font-semibold py-2 px-4 rounded bg-gradient-to-r from-blue-500 to-pink-500 
                transition-all duration-300  hover:from-pink-500 hover:to-blue-500"
                  outline
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={!data || page * limit >= data?.totalPosts}
                >
                  Next
                </Button>
                <p>Page {page}</p>
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

export default Posts;
