import { useQuery } from '@tanstack/react-query';
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../../auth/model/auth-store';
import { useDeletePostMutation } from '../../posts/api/mutations/post-mutation';
import { getAllPosts } from '../../posts/api/postApi';
import { useTranslation } from 'react-i18next';

export const AdminAllPostsTable = () => {
  const limit = 5;
  const [page, setPage] = useState(1);
  const { user } = useAuthStore();
  const { t } = useTranslation();
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
              <div className="flex justify-center items-center gap-4 mt-4 border-gray-400 border-t pt-2">
                <Pagination
                  layout="navigation"
                  currentPage={page}
                  totalPages={Math.ceil(data.totalPosts / limit)}
                  onPageChange={setPage}
                  showIcons
                />
                <span className="text-sm text-gray-500">
                  {t('pagination.page_info', {
                    current: page,
                    total: Math.ceil(data.totalPosts / limit),
                  })}
                </span>
              </div>
            ))}
        </>
      ) : (
        <p>You have no posts yet</p>
      )}
    </div>
  );
};
