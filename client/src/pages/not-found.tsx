import { Link } from 'react-router-dom';
import notFound from '../assets/not-found.webp';

export const NotFound = () => {
  return (
    <div className="flex relative justify-center  items-center min-h-screen md:min-h-0">
      <img
        className="w-[350px] h-[300px] md:w-[600px] md:h-[450px]"
        src={notFound}
        alt="not-found"
      />
      <Link
        to="/"
        className="absolute  md:bottom-[-60px] left-1/2 transform -translate-x-1/2 text-2xl font-semibold hover:underline"
      >
        Back to Home
      </Link>
    </div>
  );
};
