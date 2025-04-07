import { Outlet } from "react-router-dom";
import Header from "./Header";





export default function SharedLauot() {
  return (
    <>
      <Header />
      <main>
        <Outlet/>
      </main>
    </>
  )
}
