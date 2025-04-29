import { Route, Routes } from 'react-router-dom';
import SharedLayout from './components/shared/shared-lauot';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import { PrivateRoute, RestrictedRoute } from './lib/redirect-routes';
import { NotFound } from './pages/not-found';
import Posts from './pages/Posts';
import FullPost from './pages/FullPost';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Posts />} />
        <Route path="/posts/:slug" element={<FullPost />} />
        <Route
          path="/sign-up"
          element={<RestrictedRoute component={<SignUp />} redirectTo="/" />}
        />
        <Route
          path="/sign-in"
          element={<RestrictedRoute component={<SignIn />} redirectTo="/" />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute component={<Dashboard />} redirectTo="/sign-in" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
