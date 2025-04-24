import { Route, Routes } from 'react-router-dom';
import SharedLayout from './components/shared/shared-lauot';
import Home from './pages/Home';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import SignUp from './pages/SignUp';
import { PrivateRoute, RestrictedRoute } from './lib/redirect-routes';
import { NotFound } from './pages/not-found';
import Posts from './pages/Posts';
import FullPost from './pages/FullPost';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:slug" element={<FullPost />} />
        <Route
          path="/sign-up"
          element={
            <RestrictedRoute component={<SignUp />} redirectTo="/posts" />
          }
        />
        <Route
          path="/sign-in"
          element={
            <RestrictedRoute component={<SignIn />} redirectTo="/posts" />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute component={<Dashboard />} redirectTo="/sign-in" />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
