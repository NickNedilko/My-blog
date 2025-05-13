import { Route, Routes } from 'react-router-dom';

import PostsPage from '../features/posts/pages/PostsPage';
import SearchPostsPage from '../features/posts/pages/SearchPostsPage';
import OnePostPage from '../features/posts/pages/OnePostPage';
import SignUpPage from '../features/auth/pages/SignUpPage';
import SignInPage from '../features/auth/pages/SignInPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import { SharedLauot } from '../shared/components/SharedLayout';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivateRoute, RestrictedRoute } from '../lib/redirect-routes';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLauot />}>
        <Route index element={<PostsPage />} />
        <Route path="/search" element={<SearchPostsPage />} />

        <Route path="/posts/:slug" element={<OnePostPage />} />
        <Route
          path="/sign-up"
          element={
            <RestrictedRoute component={<SignUpPage />} redirectTo="/" />
          }
        />
        <Route
          path="/sign-in"
          element={
            <RestrictedRoute component={<SignInPage />} redirectTo="/" />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute component={<DashboardPage />} redirectTo="/sign-in" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
