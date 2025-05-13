import { FC } from 'react';

import { PostSkeleton } from './PostSkeleton';
import { PostCard } from './PostCard';
import { formatDate } from '../utils/format-data';
import { Post } from '../../../shared/types';

interface PostListProps {
  isLoading?: boolean;
  isEditable?: boolean;
  posts: Post[];
  lang?: string;
}

export const PostList: FC<PostListProps> = ({
  posts,
  isLoading,
  isEditable,
  lang,
}) => {
  return (
    <div>
      {isLoading
        ? [...Array(2)].map((_, i) => <PostSkeleton key={i} />)
        : posts.map((post) => (
            <PostCard
              key={post._id}
              id={post._id.toString()}
              title={post.title}
              imageUrl={post.imageUrl}
              user={post.user}
              createdAt={formatDate(post.createdAt, lang)}
              viewsCount={post.viewsCount}
              commentsCount={post.commentCount}
              slug={post.slug}
              category={post.category}
              tags={post.tags}
              isEditable={isEditable}
            />
          ))}
    </div>
  );
};

export default PostList;
