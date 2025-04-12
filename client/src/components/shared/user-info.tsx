import { FC } from "react";


interface UserInfoProps {
    avatarUrl: string;
    fullName: string;
    additionalText: string;
}

export const UserInfo:FC<UserInfoProps> = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className='flex items-center'>
      <img className='w-[40px] h-[40px] rounded-full mr-3' src={avatarUrl ||'noAvatar'} alt={fullName} />
      <div className='flex flex-col'>
        <span className='font-bold text-sm'>{fullName}</span>
        <span className='opacity-50 text-xs'>{additionalText}</span>
      </div>
    </div>
  );
};
