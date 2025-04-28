import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../../services/postApi';
import { useAuthStore } from '../../store/auth-store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { useDeletePostMutation } from '../../mutations/post-mutation';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'flowbite-react';

export const DashboardPosts = () => {
  const limit = 5;
  const [page, setPage] = useState(1);
  const { user } = useAuthStore();

  const { mutate: deletePost } = useDeletePostMutation();

  const { data } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => getAllPosts(page, limit),
    refetchOnMount: true,
  });

  return (
    <div className="table-auto  overflow-x-scroll md:mx-auto p-8 scrollbar xl:[&::-webkit-scrollbar]:hidden scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500">
      {user?.isAdmin ? (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Date updated</TableHeadCell>
                <TableHeadCell>Post image</TableHeadCell>
                <TableHeadCell>Post title</TableHeadCell>
                <TableHeadCell>Author</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Delete</span>
                </TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Edit</span>
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y bg-gray-600">
              {data?.posts.map((post) => (
                <TableRow
                  key={post._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/posts/${post.slug}`}>
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </Link>
                  </TableCell>
                  <TableCell className=" truncate whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Link
                      className="block text-center w-64 truncate"
                      to={`/posts/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {post.user ? post.user.userName : 'Deleted author'}
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => deletePost(post.slug)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </TableCell>
                  <TableCell>
                    <a
                      href={`/dashboard?tab=edit-post&slug=${post.slug}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!data ||
            (data?.totalPosts > limit && (
              <div className="flex justify-center gap-4 mt-4 border-gray-400 border-t pt-2">
                <Button
                  className="text-white font-semibold py-2 px-4 rounded bg-gradient-to-r from-blue-500 to-pink-500 
                transition-all duration-300  hover:from-pink-500 hover:to-blue-500"
                  outline
                  onClick={() => setPage((prev) => Math.max(prev - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  className="text-white font-semibold py-2 px-4 rounded bg-gradient-to-r from-blue-500 to-pink-500 
                transition-all duration-300  hover:from-pink-500 hover:to-blue-500"
                  outline
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={!data || page * limit >= data?.totalPosts}
                >
                  Next
                </Button>
                <p>Page {page}</p>
              </div>
            ))}
        </>
      ) : (
        <p>You have no posts yet</p>
      )}
    </div>
  );
};
