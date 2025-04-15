import { TabItem, Tabs } from "flowbite-react";
import { FaRegNewspaper } from "react-icons/fa";
import { TbChartBarPopular } from "react-icons/tb";
import { TagsBlock } from '../components/shared/tags-block';
import { useQuery} from '@tanstack/react-query';
import { Post } from "../components/shared/post";
import { getAllPosts } from "../services/postApi";
import { formateDate } from "../lib/formate-data";
import { CommentsBlock } from "../components/shared/comments-block";
import { PostSkeleton } from "../components/shared/post-skeleton";



const Posts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,

  });


  return (
    <div className="w-full px-4 md:px-8 lg:px-40">
      <Tabs aria-label="Tabs with underline" variant="underline">
        <TabItem active title="New" icon={FaRegNewspaper}/>
        <TabItem active title="Popular" icon={TbChartBarPopular}/>
      </Tabs>
            <div className="flex flex-wrap mt-4">
              <div className="w-full md:w-2/3 flex flex-col gap-6">
          {isLoading ? (
            [...Array(2)].map((_, i) => <PostSkeleton key={i} />)
          ) : (
            data?.posts.map((post) => (
              <Post
                key={post._id}
                id={post._id.toString()}
                title={post.title}
                imageUrl={post.imageUrl}
                user={post.user}
                createdAt={formateDate(post.createdAt)}
                viewsCount={post.viewsCount}
                commentsCount={3}
                slug={post.slug}
                category={post.category}
                deletePost={(id: string) => console.log(id)}
                tags={post.tags}
              />
            ))
          )}
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <TagsBlock items={data?.tags as string[] || []} isLoading={isLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top...',
              },
            ]}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Posts;