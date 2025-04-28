import { useParams } from 'react-router-dom';
import { getOnePost, getPostsByCategory } from '../services/postApi';
import { Post } from '../components/shared/post';
import DOMPurify from 'dompurify';

import { useQuery } from '@tanstack/react-query';
import { formateDate } from '../lib/formate-data';
import { CommentSection } from '../components/shared/comment-section';
import { Title } from '../components/shared/title';
import { PostCard } from '../components/shared/post-card';

const FullPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getOnePost(slug as string),
  });

  const { data: postsByCategory } = useQuery({
    queryKey: ['postsByCategory', post?.category],
    queryFn: () => getPostsByCategory(post?.category as string),
    enabled: !!post?.category,
  });
  console.log(postsByCategory);

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
        commentsCount={post.commentCount}
        tags={post.tags}
        category={post.category}
        isFullPost
      >
        <p
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      </Post>
      <CommentSection postId={post._id} />
      <div className="mt-6 flex flex-col justify-center items-center">
        <Title text={`Recent articles in ${post.category} category`} />
        <ul className="flex flex-wrap gap-10 my-10">
          {postsByCategory?.posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FullPost;
