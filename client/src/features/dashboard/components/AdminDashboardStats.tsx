import { useQuery } from '@tanstack/react-query';

import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../auth/model/auth-store';
import { getUsers } from '../../user/api/userApi';
import { getComments } from '../../comments/api/commentApi';
import { getAllPosts } from '../../posts/api/postApi';
import { Title } from '../../../shared/components/Title';

export const AdminDashboardStats = () => {
  const page = 1;
  const limit = 5;
  const { user } = useAuthStore();

  if (!user?.isAdmin) {
    return;
  }
  const { data: users } = useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => getUsers(page, limit),
  });

  const { data: comments } = useQuery({
    queryKey: ['commensts', page, limit],
    queryFn: () => getComments({ page, limit }),
  });

  const { data: posts } = useQuery({
    queryKey: ['posts', page, limit],
    queryFn: () => getAllPosts(page, limit),
  });

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 rounded-md shadow-md md:w-72 w-full gap-4">
          <div className="flex justify-between">
            <div className=" ">
              <Title
                text="Total users"
                size="sm"
                className="text-gray-500 uppercase"
              />
              <p className="text-2xl font-semibold">{users?.totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full p-3 shadow-lg text-5xl" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex gap-1 items-center">
              <HiArrowNarrowUp />
              {users?.lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 rounded-md shadow-md md:w-72 w-full gap-4">
          <div className="flex justify-between">
            <div className=" ">
              <Title
                text="Total posts"
                size="sm"
                className="text-gray-500 uppercase"
              />
              <p className="text-2xl font-semibold">{posts?.totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full p-3 shadow-lg text-5xl" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex gap-1 items-center">
              <HiArrowNarrowUp />
              {posts?.lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 rounded-md shadow-md md:w-72 w-full gap-4">
          <div className="flex justify-between">
            <div className=" ">
              <Title
                text="Total comments"
                size="sm"
                className="text-gray-500 uppercase"
              />
              <p className="text-2xl font-semibold">
                {comments?.commentsCount}{' '}
              </p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full p-3 shadow-lg text-5xl" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex gap-1 items-center">
              <HiArrowNarrowUp />
              {comments?.lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <Title text="Recent users" size="md" className="text-center p-2" />
            <Button
              outline
              className="bg-gradient-to-r from-blue-500 to-pink-500 
                transition-all duration-300  hover:from-pink-500 hover:to-blue-500"
            >
              <Link to="/dashboard?tab=users">See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>User avatar</TableHeadCell>
              <TableHeadCell>User name</TableHeadCell>
            </TableHead>
            {users?.users.map((user) => (
              <TableBody key={user._id}>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    <img
                      src={user.avatarUrl}
                      alt="user avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{user.userName}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <Title
              text="Recent comments"
              size="sm"
              className="text-center p-2"
            />
            <Button
              outline
              className="bg-gradient-to-r from-blue-500 to-pink-500 
                transition-all duration-300  hover:from-pink-500 hover:to-blue-500"
            >
              <Link to="/dashboard?tab=comments">See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Comment content</TableHeadCell>
              <TableHeadCell>Number of likes</TableHeadCell>
            </TableHead>
            {comments?.comments.map((comment) => (
              <TableBody key={comment._id}>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="w-96">
                    <p className="line-clamp-2"> {comment.content}</p>
                  </TableCell>
                  <TableCell>{comment.numberOfLikes}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
        <div className="flex  justify-between p-3 text-sm font-semibold">
          <Title text="Recent posts" size="sm" className="text-center p-2" />
          <Button
            outline
            className="bg-gradient-to-r from-blue-500 to-pink-500 
                transition-all duration-300  hover:from-pink-500 hover:to-blue-500"
          >
            <Link to="/dashboard?tab=posts">See all</Link>
          </Button>
        </div>
        <div className="table-auto overflow-x-scroll  p-8 scrollbar xl:[&::-webkit-scrollbar]:hidden scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500">
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Post image</TableHeadCell>
              <TableHeadCell>Post title</TableHeadCell>
              <TableHeadCell>Post category</TableHeadCell>
              <TableHeadCell>Post views</TableHeadCell>
            </TableHead>
            {posts?.posts.map((post) => (
              <TableBody key={post._id}>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="w-14">
                    <img
                      src={post.imageUrl}
                      alt="user avatar"
                      className="w-14 h-10 rounded-md"
                    />
                  </TableCell>
                  <TableCell className="w-72">{post.title}</TableCell>
                  <TableCell className="w-8">{post.category}</TableCell>
                  <TableCell className="w-8">{post.viewsCount}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
};
