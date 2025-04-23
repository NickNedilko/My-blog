import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/userApi";
import { FC } from "react";

interface CommentProps {
    comment: {
        content: string;
        createdAt: Date;
    };
    id: string;
    key: string;
}

export const Comment: FC<CommentProps> = ({ comment, id, key }) => {
    const { data: user } = useQuery({
        queryKey: ['user', id],
        queryFn:  ()=> getUserById(id),
    })
 
  return (
      <li key={key} className="flex p-4 border-b dark:border-gray-600 text-sm">
          <div className="flex-shrink-0 mr-3">
              <img src={user?.avatarUrl} alt={user?.userName} className="w-10 h-10 rounded-full bg-gray-200" />
          </div>
          <div className="flex-1">
          <div className="flex items-center mb-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-bold mr-1 text-xs truncate">@{user ? user.userName : 'Deleted author'}</span>
                    <span className="text-xs text-gray-400">{moment(comment.createdAt).fromNow()}</span>
              </div>
              </div>
                <p className="text-gray-500 dark:text-gray-400 pb-2">{comment.content}</p>
          </div>
    </li>
  )
}

