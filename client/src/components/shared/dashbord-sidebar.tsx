import {
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarItemGroup,
} from 'flowbite-react';
import { FaUser } from 'react-icons/fa';

import { MdOutlineCreate } from 'react-icons/md';
import { FaClipboardList, FaUsers } from 'react-icons/fa';
import { HiClipboardDocumentList, HiChartPie } from 'react-icons/hi2';
import { FaArrowRightFromBracket, FaRegComments } from 'react-icons/fa6';
import { Link, useSearchParams } from 'react-router-dom';
import { useLogoutMutation } from '../../mutations/auth-mutation';
import { useAuthStore } from '../../store/auth-store';
import { useTranslation } from 'react-i18next';

export const DashboardSidebar = () => {
  const { mutate: logout } = useLogoutMutation();
  const [searchParams] = useSearchParams();
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const tab = searchParams.get('tab') || '';
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup className="flex flex-col md:gap-2">
          <Link to={`/dashboard?tab=dash`}>
            <SidebarItem
              active={tab === 'dash'}
              icon={HiChartPie}
              labelColor="dark"
            >
              {t('dashboard_sidebar.dashboard')}
            </SidebarItem>
          </Link>
          <Link to={`/dashboard?tab=profile`}>
            <SidebarItem
              active={tab === 'profile'}
              icon={FaUser}
              label={user?.isAdmin ? 'Admin' : 'User'}
              labelColor="dark"
            >
              {t('dashboard_sidebar.profile')}
            </SidebarItem>
          </Link>
          <Link to={`/dashboard?tab=create-post`}>
            <SidebarItem
              active={tab === 'create-post'}
              icon={MdOutlineCreate}
              labelColor="dark"
            >
              {t('dashboard_sidebar.create_post')}
            </SidebarItem>
          </Link>
          <Link to={`/dashboard?tab=my-posts`}>
            <SidebarItem
              active={tab === 'my-posts'}
              icon={FaClipboardList}
              labelColor="dark"
            >
              {t('dashboard_sidebar.my_posts')}
            </SidebarItem>
          </Link>

          {user?.isAdmin && (
            <>
              <Link to={`/dashboard?tab=users`}>
                <SidebarItem
                  active={tab === 'users'}
                  icon={FaUsers}
                  labelColor="dark"
                >
                  {t('dashboard_sidebar.users')}
                </SidebarItem>
              </Link>
              <Link to={`/dashboard?tab=posts`}>
                <SidebarItem
                  active={tab === 'posts'}
                  icon={HiClipboardDocumentList}
                  labelColor="dark"
                >
                  {t('dashboard_sidebar.posts')}
                </SidebarItem>
              </Link>
              <Link to={`/dashboard?tab=comments`}>
                <SidebarItem
                  active={tab === 'comments'}
                  icon={FaRegComments}
                  labelColor="dark"
                >
                  {t('dashboard_sidebar.comments')}
                </SidebarItem>
              </Link>
            </>
          )}

          <SidebarItem
            onClick={() => logout()}
            icon={FaArrowRightFromBracket}
            className="cursor-pointer"
          >
            {t('dashboard_sidebar.sign_out')}
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};
