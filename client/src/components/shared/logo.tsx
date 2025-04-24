import { Link } from 'react-router-dom';

interface ILogoProps {
  className?: string;
}

export const Logo: React.FC<ILogoProps> = ({ className }) => {
  return (
    <Link to="/" className={className}>
      <span
        className="text-white font-semibold py-1 px-2 rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 
                transition-all duration-300  hover:from-pink-500 hover:to-blue-500"
      >
        Nick's
      </span>
      Blog
    </Link>
  );
};
