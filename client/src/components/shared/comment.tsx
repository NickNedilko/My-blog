import moment from 'moment';
import { AiFillLike } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../services/userApi';
import { FC, useState } from 'react';
import { useEditCommentMutation, useLikeCommentMutation } from '../../mutations/comment-mutation';
import { useAuthStore } from '../../store/auth-store';
import { Button, Textarea } from 'flowbite-react';

interface CommentProps {
  onDelete?: () => void;
  comment: {
    _id: string;
    numberOfLikes: number;
    content: string;
    createdAt: Date;
    user: {
      _id: string;
      userName: string;
      avatarUrl: string;
    };
  };

  id: string;
}

export const Comment: FC<CommentProps> = ({ comment, id,  onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const { user: currentUser } = useAuthStore();
  const { data: user } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });

  const { mutate: likeComment } = useLikeCommentMutation();
  const {mutate: editComment} = useEditCommentMutation();

  const handleLike = (commentId: string) => {
    if (!user) return;
    likeComment(commentId);
  };

  const handleEdit = (commentId: string) => {
    if (!user) return;
    editComment({ commentId, data: { content: commentContent } });
    setIsEdit(!isEdit);
  };

  return (
    <div key={comment._id} className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user?.avatarUrl}
          alt={user?.userName}
          className="w-10 h-10 rounded-full bg-gray-200"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center mb-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-bold mr-1 text-xs truncate">
              @{user ? user.userName : 'Deleted author'}
            </span>
            <span className="text-xs text-gray-400">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
        </div>

        {!isEdit ? (
          <p className="text-gray-500 dark:text-gray-400 pb-2">
            {comment.content}
          </p>
        ) : (
          <form className="rounded-md">
            <Textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              maxLength={200}
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center justify-between gap-2">
                <Button
                    outline
                  onClick={() => handleEdit(comment._id)}
                  type="submit"
                  className=" bg-gradient-to-r from-blue-500 to-pink-500  
                                  transition-all duration-300  hover:from-pink-500 hover:to-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setIsEdit(!isEdit)}
                  outline
                  type="submit"
                  className=" dark:text-white px-4 py-2 rounded-md mt-2 hover:bg-gradient-to-r from-blue-500 to-pink-500"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}
        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={() => handleLike(comment._id)}
            className="flex items-center text-gray-500 hover:text-blue-500"
          >
            <AiFillLike className="mr-1" />
            {comment.numberOfLikes === 0
              ? ''
              : `${comment.numberOfLikes} ${comment.numberOfLikes > 1 ? 'likes' : 'like'}`}
          </button>
          {(comment.user._id === currentUser?._id || currentUser?.isAdmin) && (
            <>
              <button
                onClick={() => setIsEdit(!isEdit)}
                type="button"
                className="text-gray-500 hover:text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                type="button"
                className="text-gray-500 hover:text-red-500"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
