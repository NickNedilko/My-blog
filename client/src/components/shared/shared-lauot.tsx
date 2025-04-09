import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Footerr } from "./footer";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/userApi";
import { useAuthStore } from "../../store/auth-store";
import { Loader } from "./loader";





export default function SharedLauot() {
 

  const {data: user, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });


  if (user) {
    useAuthStore.getState().setLoggedIn();
    useAuthStore.getState().setUser(user);
  }
   


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footerr />
        </>
      )}
    </>
  );
}