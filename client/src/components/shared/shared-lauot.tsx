import { Outlet } from "react-router-dom";
import Header from "./Header";
import { jwtDecode } from "jwt-decode";
import { Footerr } from "./footer";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/userApi";
import { useAuthStore } from "../../store/auth-store";
import { Loader } from "./loader";
import { Suspense } from "react";





export default function SharedLauot() {


  const {data: user, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });


  if (user) {
    const token = localStorage.getItem('authToken');
    const decoded: any = jwtDecode(token as string);
    useAuthStore.getState().setLoggedIn();
    useAuthStore.getState().setUser({...user, isAdmin: decoded.isAdmin});
  }
   


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
            <main>
              <Suspense fallback={<Loader />}>
              
                 <Outlet />
              
              </Suspense>
              
            </main>
            <Footerr />
            
        </>
      )}
    </>
  );
}