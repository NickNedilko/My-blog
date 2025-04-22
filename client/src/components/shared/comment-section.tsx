import { FC, useState } from "react";
import { useAuthStore } from "../../store/auth-store";
import { Link } from "react-router-dom";
import { Button, Textarea } from "flowbite-react";
import { useCreateCommentMutation } from "../../mutations/comment-mutation";


interface CommentSectionProps {
    postId: string;
}
export const CommentSection:FC<CommentSectionProps> = ({postId}) => {
  const {user} = useAuthStore();
  const [comment, setComment] = useState('')
    const {mutate} = useCreateCommentMutation();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            post: postId,
            content: comment
        }
        mutate(data);
        setComment('');
    }

    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {user ? (
                <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
                <p>Signed in as:  </p>
               <img src={user.avatarUrl} alt={user.userName} className="w-8 h-8 rounded-full" /> 
                    <Link to='/dashboard?tab=profile' className="text-xs text-cyan-600 hover:underline hover:text-cyan-700">
                        <p >@{user.userName}</p>
                    </Link>
                </div> 
            ):
                (
                    <div className="flex gap-2 text-sm text-teal-500 my-5">
                        <p>Sign in to left comment.</p>
                        <Link to='/sign-in' className="text-blue-500 hover:underline hover:text-blue-700">
                            Sign in
                        </Link>
                    </div>
                )}
            {user && (
                <form onSubmit={handleSubmit} className="border rounded-md border-teal-500 p-4">
                    <Textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className=""
                    placeholder="Write a comment..."
                    rows={4}
                    maxLength={200}
                    />
                    <div className="flex justify-between items-center mt-3">
                        <p className="text-gray-500 text-xs">{200 - comment.length} characters remaining</p>
                        <Button outline type="submit" className=" bg-gradient-to-r from-blue-500 to-pink-500  
                          transition-all duration-300  hover:from-pink-500 hover:to-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600">
                            Submit
                        </Button>
                    </div>
                </form>
            )}
    </div>
  )
}

