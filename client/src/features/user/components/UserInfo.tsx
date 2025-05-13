import { FC } from 'react';
import avatar from '../../../assets/no-avatar.webp';

interface UserInfoProps {
  avatarUrl: string;
  userName: string;
  additionalText: string;
}

export const UserInfo: FC<UserInfoProps> = ({
  avatarUrl,
  userName,
  additionalText,
}) => {
  return (
    <div className="flex items-center">
      <img
        className="w-[40px] h-[40px] rounded-full mr-3"
        src={avatarUrl || avatar}
        alt={userName}
      />
      <div className="flex flex-col">
        <span className="font-bold text-sm">
          {userName || 'Deleted author'}
        </span>
        <span className="opacity-50 text-xs">{additionalText}</span>
      </div>
    </div>
  );
};
