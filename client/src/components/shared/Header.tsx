import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from 'flowbite-react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

import { FaMoon, FaSun } from 'react-icons/fa';
import { Logo } from './logo';
import { useAuthStore } from '../../store/auth-store';
import { useThemeStore } from '../../store/theme';
import { useLogoutMutation } from '../../mutations/auth-mutation';
import { useEffect, useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoggedIn, user } = useAuthStore();
  const { toggleTheme, theme } = useThemeStore();
  const { mutate: logout } = useLogoutMutation();

  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchUrl = searchParams.get('search');
    if (searchUrl) {
      setSearch(searchUrl);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ search });
    navigate(`/search?search=${search}`);
  };

  return (
    <Navbar className="border-b-2 md:px-30">
      <Logo className="mr-3 text-xl md:text-2xl h-6 sm:h-9" />
      <form className="flex items-center" onSubmit={handleSubmit}>
        <TextInput
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="lg:hidden" color="light" pill>
        <AiOutlineSearch size={16} />
      </Button>
      <div className="flex items-center gap-4 md:order-2">
        <Button
          onClick={() => toggleTheme()}
          color="light"
          pill
          className="w-12 h-8 hidden sm:inline "
        >
          {theme === 'dark' ? <FaMoon /> : <FaSun color="gray" />}
        </Button>
        {isLoggedIn ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar rounded alt="user" img={user?.avatarUrl} />}
          >
            <DropdownHeader>
              <span>
                {user?.userName} {user?.email}{' '}
              </span>
            </DropdownHeader>
            <Link to="/dashboard?tab=profile">
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem onClick={() => logout()}>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              color="gradient"
            >
              Login
            </Button>
          </Link>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {/* <NavbarLink
          className={
            pathname === '/'
              ? 'text-blue-500  dark:text-white'
              : 'text-gray-600'
          }
          as="div"
        >
          <Link to="/">Home</Link>
        </NavbarLink>
        <NavbarLink
          className={
            pathname === '/about'
              ? 'text-blue-500 dark:text-white'
              : 'text-gray-600'
          }
          as="div"
        >
          <Link to="/about">About</Link>
        </NavbarLink> */}
        <NavbarLink
          className={
            pathname === '/'
              ? 'text-blue-500  dark:text-white'
              : 'text-gray-600'
          }
          as="div"
        >
          <Link to="/">Posts</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
