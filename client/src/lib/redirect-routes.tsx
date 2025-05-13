import { Navigate } from 'react-router-dom';

import { FC } from 'react';
import { useAuthStore } from '../features/auth/model/auth-store';

interface RouteProps {
  component: any;
  redirectTo?: string;
}

export const RestrictedRoute: FC<RouteProps> = ({
  component,
  redirectTo = '/',
}) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export const PrivateRoute: FC<RouteProps> = ({
  component,
  redirectTo = '/',
}) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isFetching = false;

  return !isLoggedIn && !isFetching ? <Navigate to={redirectTo} /> : component;
};
