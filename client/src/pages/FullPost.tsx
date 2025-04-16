import { useParams } from "react-router-dom";
import { getOnePost } from "../services/postApi";
import { Post } from "../components/shared/post";
import DOMPurify from "dompurify";
import { CommentsBlock } from "../components/shared/comments-block";

import { useQuery } from "@tanstack/react-query";
import { formateDate } from "../lib/formate-data";


const FullPost = () => {
const { slug } = useParams<{ slug: string }>();

    const {data: post} = useQuery({
        queryKey: ['post', slug],
        queryFn: () => getOnePost(slug as string),
    });

    if (!post) {
        return <h1>Post not found</h1>;
    }
  return (
    <div className="w-full px-4 md:px-8 lg:px-40 mt-6">
      <Post
      id={post._id.toString()}
      title={post.title}
      imageUrl={post.imageUrl}
      user={post.user}
      createdAt={formateDate(post.createdAt)}
      viewsCount={post.viewsCount}
      commentsCount={3}
      tags={post.tags}
      category={post.category}
      isFullPost
      >
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}/>
         
       
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        
      >
        
      </CommentsBlock>
    </div>
  );
};


export default FullPost;