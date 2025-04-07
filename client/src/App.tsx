import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/shared/shared-lauot";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import { RestrictedRoute } from "./lib/redirect-routes";


export default function App() {
  return (
    <Routes>
      <Route path='/' element={<SharedLayout/>}>
      <Route index element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/sign-up" element={<RestrictedRoute component={<SignUp />} redirectTo='/'/>} />
      <Route path="/sign-in" element={<RestrictedRoute component={<SignIn />} redirectTo='/'/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
     </Route>
    </Routes>
  )
}
