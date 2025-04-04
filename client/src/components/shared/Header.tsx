import { Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import logo from '../../assets/logo.png'
import { FaMoon } from "react-icons/fa";

export default function Header() {
 const {pathname} = useLocation();
  return (
      <Navbar className="border-b-2">
      <Link to="/" className="flex items-center self-center whitespace-nowrap text-sm sm:text-xl">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="My Blog Logo" />
        <span className="self-center font-semibold whitespace-nowrap dark:text-white">My Blog</span>
          </Link>
          <form>
              <TextInput
                  placeholder="Search..."
                  type="text" rightIcon={AiOutlineSearch} className="hidden lg:inline"/>
          </form>
          <Button className="lg:hidden" color='light' pill>
              <AiOutlineSearch size={16}/>
          </Button>
          <div className="flex items-center gap-4 md:order-2">
              <Button color='blue' pill className="w-12 h-10 hidden sm:inline">
                  <FaMoon/>
              </Button>
              <Link to='/sign-in'>
              <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" color='gradient' >Login</Button>
              </Link>
              <NavbarToggle/>
          </div>
              <NavbarCollapse >
                  <NavbarLink className={pathname === '/' ? 'text-blue-500' : 'text-gray-600'} as ='div'>
                      <Link to="/">Home</Link>
              </NavbarLink>
              <NavbarLink className={pathname === '/about' ? 'text-blue-500' : 'text-gray-600'} as ='div'>
                      <Link to="/about">About</Link>
              </NavbarLink>
              <NavbarLink className={pathname === '/projects' ? 'text-blue-500' : 'text-gray-600'} as ='div'> 
                  <Link to="/projects">Projects</Link>
              </NavbarLink>
              </NavbarCollapse>
    </Navbar>
  )
}
