import { FC, useState } from 'react';
import { useAuthStore } from '../../store/auth-store';
import { Link } from 'react-router-dom';
import { Button, Textarea } from 'flowbite-react';
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from '../../mutations/comment-mutation';
import { useQuery } from '@tanstack/react-query';
import { Comment } from './comment';
import { getPostComments } from '../../services/commentApi';
import { ModalPopup } from './popup-modal';
import { useTranslation } from 'react-i18next';

interface CommentSectionProps {
  postId: string;
}
export const CommentSection: FC<CommentSectionProps> = ({ postId }) => {
  const { user } = useAuthStore();
  const [comment, setComment] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentId, setCommentId] = useState<string | null>('');
  const { mutate } = useCreateCommentMutation();

  const { mutate: deleteComment } = useDeleteCommentMutation();
  const { t } = useTranslation();
  const MAX_LENGTH = 200;
  const handleDelete = () => {
    if (commentId) {
      deleteComment(commentId);
      setDeleteModal(false);
      setCommentId(null);
    }
  };

  const { data: postComments } = useQuery({
    queryKey: ['post-comments', postId],
    queryFn: () => getPostComments(postId),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      post: postId,
      content: comment,
    };
    mutate(data);
    setComment('');
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {user ? (
        <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
          <p>{t('messages.signed_as')}</p>
          <img
            src={user.avatarUrl}
            alt={user.userName}
            className="w-8 h-8 rounded-full"
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-cyan-600 hover:underline hover:text-cyan-700"
          >
            <p>@{user.userName}</p>
          </Link>
        </div>
      ) : (
        <div className="flex gap-2 text-sm text-teal-500 my-5">
          <p>{t('messages.sign_to_commet')}</p>
          <Link
            to="/sign-in"
            className="text-blue-500 hover:underline hover:text-blue-700"
          >
            {t('navigation.sign_in')}
          </Link>
        </div>
      )}
      {user && (
        <form
          onSubmit={handleSubmit}
          className="border rounded-md border-teal-500 p-4"
        >
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className=""
            placeholder={t('placeholders.write_comment')}
            rows={4}
            maxLength={MAX_LENGTH}
          />
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-500 text-xs">
              {t('messages.chars_remaining', {
                count: MAX_LENGTH - comment.length,
              })}
            </p>
            <Button
              outline
              type="submit"
              className=" bg-gradient-to-r from-blue-500 to-pink-500  
                          transition-all duration-300  hover:from-pink-500 hover:to-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600"
            >
              {t('buttons.submit')}
            </Button>
          </div>
        </form>
      )}
      {postComments?.length ? (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p className="text-gray-500">Comments:</p>
            <div className="border border-gray-400 py-1 rounded-sm px-2">
              <p className="text-sm text-gray-500">{postComments.length}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center mt-4">
          <p className="text-gray-500 text-sm">{t('messages.no_comments')}</p>
        </div>
      )}
      <div>
        {postComments?.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            id={comment.user._id}
            onDelete={() => {
              setCommentId(comment._id);
              setDeleteModal(true);
            }}
          />
        ))}
      </div>
      <ModalPopup
        openModal={deleteModal}
        setOpenModal={setDeleteModal}
        text={t('messages.delete_comment')}
        onDelete={handleDelete}
      />
    </div>
  );
};
