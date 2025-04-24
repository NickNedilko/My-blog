import clsx from 'clsx';
import { FC } from 'react';
import { MdClear } from 'react-icons/md';

interface IClearButtonProps {
  onClick?: () => void;
  className?: string;
}

export const ClearButton: FC<IClearButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer',
        className
      )}
    >
      <MdClear className="h-5 w-5" />
    </button>
  );
};
