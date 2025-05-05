import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Footerr } from './footer';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../services/userApi';
import { useAuthStore } from '../../store/auth-store';
import { Loader } from './loader';
import { Suspense, useEffect } from 'react';
import { ScrollToTop } from './scroll-to-top';

export default function SharedLauot() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  useEffect(() => {
    if (user) {
      useAuthStore.getState().setLoggedIn();
      useAuthStore.getState().setUser({ ...user });
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ScrollToTop />
          <Header />
          <main>
            <Suspense fallback={<Loader />}>
              <div>
                <Outlet />
              </div>
            </Suspense>
          </main>
          <Footerr />
        </>
      )}
    </>
  );
}
