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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UA, GB } from 'country-flag-icons/string/3x2';
import { LOCALS } from '../../i18n/constants';
import { useAuthStore } from '../../features/auth/model/auth-store';
import { useThemeStore } from '../../shared/store/theme-store';

import { Logo } from './Logo';
import { useLogoutMutation } from '../../features/auth/api/mutations/auth-mutation';

export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoggedIn, user } = useAuthStore();
  const { toggleTheme, theme } = useThemeStore();

  const { mutate: logout } = useLogoutMutation();

  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation();

  const isEnglish = i18n.language === LOCALS.EN;
  const toggleLanguage = () => {
    const newLang = isEnglish ? LOCALS.UK : LOCALS.EN;
    i18n.changeLanguage(newLang);
  };

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
          placeholder={t('placeholders.search')}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="hidden md:flex lg:hidden" color="light" pill>
        <AiOutlineSearch size={16} />
      </Button>
      <div className="flex items-center gap-4 md:order-2">
        <div
          onClick={toggleLanguage}
          className="cursor-pointer w-8 h-6"
          title={isEnglish ? 'Switch to Ukrainian' : 'Switch to English'}
          dangerouslySetInnerHTML={{ __html: isEnglish ? GB : UA }}
        />
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
              <DropdownItem>{t('headers.profile')}</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem onClick={() => logout()}>
              {t('buttons.sign_out')}
            </DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              color="gradient"
            >
              {t('buttons.sign_in')}
            </Button>
          </Link>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink
          className={
            pathname === '/'
              ? 'text-blue-500  dark:text-white'
              : 'text-gray-600'
          }
          as="div"
        >
          <Link to="/">{t('navigation.posts')}</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};
