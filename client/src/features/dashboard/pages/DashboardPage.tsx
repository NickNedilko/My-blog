import { useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../auth/model/auth-store';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { DashbordProfile } from '../components/DashboardProfile';
import { DashboardCreatePost } from '../components/DashboardCreatePost';
import { DashboardMyPosts } from '../components/DashboardMyPosts';
import { AdminAllPostsTable } from '../components/AdminAllPostsTable';
import { DashboardEditPost } from '../components/DashboardEditPost';
import { AdminAllUsersTable } from '../components/AdminAllUsersTable';
import { AdminAllCommentsTable } from '../components/AdminAllCommetsTable';
import { AdminDashboardStats } from '../components/AdminDashboardStats';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || '';
  const slug = searchParams.get('slug');

  return (
    <div className="min-h-screen flex flex-col  md:flex-row">
      <div>
        <DashboardSidebar />
      </div>
      {tab === 'profile' && <DashbordProfile />}
      {tab === 'create-post' && <DashboardCreatePost />}
      {tab === 'my-posts' && <DashboardMyPosts />}
      {tab === 'edit-post' && <DashboardEditPost slug={slug as string} />}
      {tab === 'posts' && user?.isAdmin && <AdminAllPostsTable />}
      {tab === 'users' && user?.isAdmin && <AdminAllUsersTable />}
      {tab === 'comments' && user?.isAdmin && <AdminAllCommentsTable />}
      {tab === 'dash' && user?.isAdmin && <AdminDashboardStats />}
    </div>
  );
}
