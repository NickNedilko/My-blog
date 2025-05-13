import { useQuery } from '@tanstack/react-query';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { useState } from 'react';
import { Button } from 'flowbite-react';
import { useAuthStore } from '../../auth/model/auth-store';
import { getComments } from '../../comments/api/commentApi';
import { useDeleteCommentMutation } from '../../comments/api/mutations/comment-mutation';

export const AdminAllCommentsTable = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const { user: currentUser } = useAuthStore();

  const { data } = useQuery({
    queryKey: ['post-comments', page, limit],
    queryFn: () => getComments({ page, limit }),
  });

  const { mutate: deleteComment } = useDeleteCommentMutation();

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-8 scrollbar xl:[&::-webkit-scrollbar]:hidden scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500">
      {currentUser?.isAdmin ? (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Update date</TableHeadCell>
                <TableHeadCell>Comment content</TableHeadCell>
                <TableHeadCell>Number of likes</TableHeadCell>
                <TableHeadCell>PostId</TableHeadCell>
                <TableHeadCell>UserName</TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Delete</span>
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {data?.comments.map((comment) => (
                <TableRow
                  key={comment._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="w-60 line-clamp-2">
                    {comment.content}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-center text-gray-900 dark:text-white">
                    {comment.numberOfLikes}
                  </TableCell>
                  <TableCell>{comment.post}</TableCell>
                  <TableCell>{comment.user.userName}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => deleteComment(comment._id)}
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
            (data?.commentsCount > limit && (
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
                  disabled={!data || page * limit >= data?.commentsCount}
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
