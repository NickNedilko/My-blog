import {
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarItemGroup,
} from 'flowbite-react';
import { FaUser } from 'react-icons/fa';
import { MdOutlineCreate } from 'react-icons/md';
import { FaClipboardList, FaUsers } from 'react-icons/fa';
import { HiClipboardDocumentList } from 'react-icons/hi2';
import { FaArrowRightFromBracket, FaRegComments } from 'react-icons/fa6';
import { Link, useSearchParams } from 'react-router-dom';
import { useLogoutMutation } from '../../mutations/auth-mutation';
import { useAuthStore } from '../../store/auth-store';

export const DashboardSidebar = () => {
  const { mutate: logout } = useLogoutMutation();
  const [searchParams] = useSearchParams();
  const { user } = useAuthStore();
  const tab = searchParams.get('tab') || '';
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup className="flex flex-col md:gap-2">
          <Link to={`/dashboard?tab=profile`}>
            <SidebarItem
              active={tab === 'profile'}
              icon={FaUser}
              label={user?.isAdmin ? 'Admin' : 'User'}
              labelColor="dark"
            >
              Profile
            </SidebarItem>
          </Link>
          <Link to={`/dashboard?tab=create-post`}>
            <SidebarItem
              active={tab === 'create-post'}
              icon={MdOutlineCreate}
              labelColor="dark"
            >
              Create Post
            </SidebarItem>
          </Link>
          <Link to={`/dashboard?tab=my-posts`}>
            <SidebarItem
              active={tab === 'my-posts'}
              icon={FaClipboardList}
              labelColor="dark"
            >
              My Posts
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
                  Users
                </SidebarItem>
              </Link>
              <Link to={`/dashboard?tab=posts`}>
                <SidebarItem
                  active={tab === 'posts'}
                  icon={HiClipboardDocumentList}
                  labelColor="dark"
                >
                  Posts
                </SidebarItem>
              </Link>
              <Link to={`/dashboard?tab=comments`}>
                <SidebarItem
                  active={tab === 'comments'}
                  icon={FaRegComments}
                  labelColor="dark"
                >
                  Commets
                </SidebarItem>
              </Link>
            </>
          )}

          <SidebarItem
            onClick={() => logout()}
            icon={FaArrowRightFromBracket}
            className="cursor-pointer"
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};
