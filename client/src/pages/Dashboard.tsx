
import {  useSearchParams } from "react-router-dom"
import { DashboardSidebar } from "../components/shared/dashbord-sidebar";
import { DashbordProfile } from "../components/shared/dashbord-profile";

export default function Dashboard() {
const [searchParams] = useSearchParams();
const tab = searchParams.get('tab') || '';

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div >
        <DashboardSidebar/>
      </div>
      {tab === 'profile' && <DashbordProfile/>}
      Dashbord
    </div>
  )
}
