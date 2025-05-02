import noPosts from '../../assets/no-posts.webp';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <img src={noPosts} alt="No posts" />
      <p className="text-gray-500 text-2xl text-center">
        You have no posts yet.{' '}
        <Link to="?tab=create-post">
          <span className="text-[#4361ee]">Create one</span>
        </Link>
      </p>
    </>
  );
};

export default NotFound;
