import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Footerr } from "./footer";





export default function SharedLauot() {
  return (
    <>
      <Header />
        <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
          <Outlet />
      </main>
      <Footerr/>
          </div>
    </>
  )
}
