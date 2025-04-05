import { Outlet } from "react-router-dom";
import Header from "./header";




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
