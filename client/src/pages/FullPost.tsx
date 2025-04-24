import { useParams } from 'react-router-dom';
import { getOnePost } from '../services/postApi';
import { Post } from '../components/shared/post';
import DOMPurify from 'dompurify';

import { useQuery } from '@tanstack/react-query';
import { formateDate } from '../lib/formate-data';
import { CommentSection } from '../components/shared/comment-section';

const FullPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post } = useQuery({
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
        <p
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      </Post>
      <CommentSection postId={post._id} />
    </div>
  );
};

export default FullPost;
