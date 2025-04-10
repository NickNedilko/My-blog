import { Sidebar, SidebarItem, SidebarItems, SidebarItemGroup  } from "flowbite-react"
import { FaUser } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link, useSearchParams } from "react-router-dom";
import { useLogoutMutation } from "../../mutations/auth-mutation";



export const DashboardSidebar = () => {
  const {mutate: logout} = useLogoutMutation();
  const [searchParams] = useSearchParams();
const tab = searchParams.get('tab') || '';
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
          <Link to={`/dashboard?tab=profile`}>
            <SidebarItem
              active={tab === 'profile'}
              icon={FaUser}
              label={"User"}
              labelColor="dark" >
              Profile
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

