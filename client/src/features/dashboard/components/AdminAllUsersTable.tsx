import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { Button } from 'flowbite-react';
import { useDeleteUserMutation } from '../../user/api/mutations/user-mutations';
import { getUsers } from '../../user/api/userApi';
import { useAuthStore } from '../../auth/model/auth-store';

export const AdminAllUsersTable = () => {
  const limit = 5;
  const [page, setPage] = useState(1);
  const { user: currentUser } = useAuthStore();

  const { mutate } = useDeleteUserMutation();

  const { data } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers(page, limit),
  });
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-8 scrollbar xl:[&::-webkit-scrollbar]:hidden scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500">
      {currentUser?.isAdmin ? (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Sign up date</TableHeadCell>
                <TableHeadCell>User avatar</TableHeadCell>
                <TableHeadCell>User name</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Admin</TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Delete</span>
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {data?.users.map((user) => (
                <TableRow
                  key={user._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <img
                      src={user.avatarUrl}
                      alt={user.userName}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.userName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500 w-5 h-5" />
                    ) : (
                      <IoClose className="text-red-500 w-6 h-6" />
                    )}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => mutate(user._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!data ||
            (data?.totalUsers > limit && (
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
                  disabled={!data || page * limit >= data?.totalUsers}
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
