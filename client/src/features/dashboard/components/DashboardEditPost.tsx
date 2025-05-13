import { PostForm } from '../../posts/components/PostForm';

export const DashboardEditPost = ({ slug }: { slug: string }) => (
  <PostForm slug={slug} />
);
