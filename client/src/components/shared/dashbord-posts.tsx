import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/postApi";
import { useAuthStore } from "../../store/auth-store";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useDeletePostMutation } from "../../mutations/post-mutation";
import { Link } from "react-router-dom";



export const DashboardPosts = () => {
  const { user } = useAuthStore();
  
  const {mutate: deletePost} = useDeletePostMutation();
 
      const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,

      });
    
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar xl:[&::-webkit-scrollbar]:hidden scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500">
      {user?.isAdmin ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>Post image</TableHeadCell>
              <TableHeadCell>Post title</TableHeadCell>
              <TableHeadCell>Author</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell>
                <span className="sr-only" >Delete</span>
              </TableHeadCell>
                <TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
                      {data?.posts.map((post) => (
              <TableRow key={post._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                          <Link to={`/posts/${post.slug}`} >
                  <img src={post.imageUrl} alt={post.title} className="w-20 h-20 object-cover rounded" />
                          </Link>
                </TableCell>
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          <Link to={`/posts/${post.slug}`} >
                  {post.title}
                          </Link>
                            </TableCell>
                <TableCell>{post.user.userName}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <button onClick={()=>deletePost(post.slug)} className="text-red-500 hover:underline">Delete</button>
                </TableCell>
                <TableCell>
                  <a href={`/dashboard?tab=edit-post&slug=${post.slug}`} className="text-blue-500 hover:underline">
                    Edit
                  </a>
                </TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>
      ) : (
        <p>You have no posts yet</p>
      )}
    </div>
  );
}
