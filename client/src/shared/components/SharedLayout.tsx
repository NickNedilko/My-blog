import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/model/auth-store';
import { Header } from './Header';
import { Footer } from './Footer';
import { Loader } from './Loader';
import { ScrollToTop } from './ScrollToTop';
import { useQuery } from '@tanstack/react-query';

import { Suspense, useEffect } from 'react';
import { getUser } from '../../features/user/api/userApi';

export const SharedLauot = () => {
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
          <Footer />
        </>
      )}
    </>
  );
};
