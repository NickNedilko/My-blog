import { TabItem, Tabs } from "flowbite-react";
import { FaRegNewspaper } from "react-icons/fa";
import { TbChartBarPopular } from "react-icons/tb";
import { TagsBlock } from '../components/shared/tags-block';
import { useQuery} from '@tanstack/react-query';
import { Post } from "../components/shared/post";
import { getAllPosts } from "../services/postApi";
import { formateDate } from "../lib/formate-data";
import { CommentsBlock } from "../components/shared/comments-block";



const Posts = () => {
  const { data, isLoading: isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,

  });


  // const { data: tags, isLoading: isLoadingTags } = useQuery({ queryKey: ['tags'], queryFn: getTags })
  
// const { mutate } = useMutation({
//   mutationFn: deletePost,
//   onSuccess: async () => {
//     toast.success('Статья успешно удалена');

//    await queryClient.invalidateQueries({ queryKey: ['posts'] }); 
//   },
// });


  return (
    <div className="w-full px-4 md:px-8 lg:px-40">
      <Tabs aria-label="Tabs with underline" variant="underline">
        <TabItem active title="New" icon={FaRegNewspaper}/>
        <TabItem active title="Popular" icon={TbChartBarPopular}/>
      </Tabs>
       <div className="flex flex-wrap">
       
        <div className="w-full md:w-2/3">
          {data?.posts.map((post) => {
            return (
              <Post
                
                key={post._id} 
                //@ts-ignore
              _id={post._id}
              title={post.title}
                imageUrl={post.imageUrl}
                  //@ts-ignore
                  user={post.user}
              createdAt={formateDate(post.createdAt)}
              viewsCount={post.viewsCount}
                commentsCount={3}
                category={post.category}
                deletePost={(id: string) => console.log(id)}
              tags={post.tags}
              // isEditable={post.user?._id === user?._id} 
            />
          )})}
            </div>
            
        <div className="w-full md:w-1/3">
          {!true? <div>loading</div>  :<TagsBlock items={data?.tags as string[]} isLoading={isLoading} />}
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
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
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