import { useParams } from 'react-router-dom';
import { getOnePost, getPostsByCategory } from '../services/postApi';
import { Post } from '../components/shared/post';
import DOMPurify from 'dompurify';

import { useQuery } from '@tanstack/react-query';
import { formatDate } from '../lib/format-data';
import { CommentSection } from '../components/shared/comment-section';
import { Title } from '../components/shared/title';
import { PostCard } from '../components/shared/post-card';
import { useTranslation } from 'react-i18next';

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

  const { t, i18n } = useTranslation();

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
        createdAt={formatDate(post.createdAt, i18n.language)}
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
        <Title
          text={t('titles.recent_articles_in_category', {
            category: t(`categories.${post.category.toLowerCase()}`),
          })}
        />
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
