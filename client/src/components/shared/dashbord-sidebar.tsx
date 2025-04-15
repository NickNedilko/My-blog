import { Sidebar, SidebarItem, SidebarItems, SidebarItemGroup  } from "flowbite-react"
import { FaUser } from "react-icons/fa";
import { MdOutlineCreate } from "react-icons/md";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link, useSearchParams } from "react-router-dom";
import { useLogoutMutation } from "../../mutations/auth-mutation";
import { useAuthStore } from "../../store/auth-store";



export const DashboardSidebar = () => {
  const {mutate: logout} = useLogoutMutation();
  const [searchParams] = useSearchParams();
  const {user} = useAuthStore()
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
              labelColor="dark" >
              Profile
        </SidebarItem>
          </Link>
          <Link to={`/dashboard?tab=create-post`}>
            <SidebarItem
              active={tab === 'create-post'}
              icon={MdOutlineCreate}
              labelColor="dark" >
              Create Post
        </SidebarItem>
          </Link>
        
        <SidebarItem onClick={() => logout()} icon={FaArrowRightFromBracket} className="cursor-pointer">
        Sign Out
          </SidebarItem>
          </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}

