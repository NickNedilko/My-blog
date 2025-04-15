export const PostSkeleton = () => {
  return (
    <div className="bg-white border border-[#dedede] rounded-lg overflow-hidden mb-4">
      <div className="w-full h-[300px] bg-gray-200 animate-pulse" />
      <div className="p-5">
        <div className="flex">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse mr-2.5" />
          <div className="flex flex-col space-y-1 ">
            <div className="w-[60px] h-[20px] bg-gray-200 animate-pulse rounded" />
            <div className="w-[100px] h-[15px] bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
        <div className="ml-12 mt-4">
            <div className="w-1/3 h-[25px] bg-gray-200 animate-pulse rounded mb-2" />
            <div className="w-1/2 h-[20px] bg-gray-200 animate-pulse rounded mb-2" />
                  
          <div className="flex gap-4">
            <div className="w-10 h-[20px] bg-gray-200 animate-pulse rounded" />
            <div className="w-10 h-[20px] bg-gray-200 animate-pulse rounded" />
            <div className="w-10 h-[20px] bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};