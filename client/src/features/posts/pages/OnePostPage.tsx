import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getOnePost, getPostsByCategory } from '../api/postApi';
import { PostCard } from '../components/PostCard';
import { formatDate } from '../utils/format-data';
import { CommentSection } from '../../comments/components/CommentSection';
import DOMPurify from 'dompurify';
import { Title } from '../../../shared/components/Title';
import { RecentPostCard } from '../components/RecentPostCard';

const OnePostPage = () => {
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
      <PostCard
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
      </PostCard>
      <CommentSection postId={post._id} />
      <div className="mt-6 flex flex-col justify-center items-center">
        <Title
          text={t('titles.recent_articles_in_category', {
            category: t(`categories.${post.category.toLowerCase()}`),
          })}
        />
        <ul className="flex flex-wrap gap-10 my-10">
          {postsByCategory?.posts?.map((post) => (
            <RecentPostCard key={post._id} post={post} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OnePostPage;
