
import {  useSearchParams } from "react-router-dom"
import { DashboardSidebar } from "../components/shared/dashbord-sidebar";
import { DashbordProfile } from "../components/shared/dashbord-profile";
import { CreatePost } from "../components/shared/dashboard-create-post";
import { MyPosts } from "../components/shared/dahsboard-my-posts";

export default function Dashboard() {
const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || '';
  const slug = searchParams.get('slug');

 
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div >
        <DashboardSidebar/>
      </div>
      {tab === 'profile' && <DashbordProfile />}
      {tab === 'create-post' && <CreatePost />}
      {tab === 'my-posts' && <MyPosts />}
      {tab === 'edit-post' && <CreatePost slug={slug} />}
    </div>
  )
}
