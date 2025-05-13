import { useQuery } from '@tanstack/react-query';
import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllPosts } from '../api/postApi';
import { RecentPostCard } from '../components/RecentPostCard';
import { NotFound } from '../../../shared/components/NotFound';

const SearchPostsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setSearchData] = useState({
    search: '',
    sort: 'desc',
    category: '',
    sortBy: '',
  });

  useEffect(() => {
    setSearchData({
      search: searchParams.get('search') || '',
      sort: searchParams.get('sort') || 'desc',
      category: searchParams.get('category') || '',
      sortBy: searchParams.get('sortBy') || '',
    });
  }, [searchParams]);

  const safeSearchData = {
    page: 1,
    search: searchData.search ?? '',
    category: searchData.category ?? '',
    sort: searchData.sort ?? '',
    sortBy: searchData.sortBy ?? '',
  };

  const { data: posts, refetch } = useQuery({
    queryKey: [
      'posts',
      {
        page: 1,
        limit: 4,
        search: searchData.search ?? '',
        category: searchData.category ?? ('' as string),
        sort: searchData.sort ?? '',
        sortBy: searchData.sortBy ?? '',
      },
    ],
    queryFn: () =>
      getAllPosts(
        safeSearchData.page,
        undefined,
        safeSearchData.search,
        safeSearchData.category,
        safeSearchData.sort,
        safeSearchData.sortBy
      ),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams(searchData);
    refetch();
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b mb:border-r md:min-h-screen border-gray-500">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">
              Search Querry:
            </label>
            <TextInput
              id="search"
              onChange={(e) =>
                setSearchData({ ...searchData, search: e.target.value })
              }
              type="text"
              value={searchData.search}
              placeholder="Search..."
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">Sort:</label>
            <Select
              value={searchData.sort}
              onChange={(e) =>
                setSearchData({ ...searchData, sort: e.target.value })
              }
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">Category:</label>
            <Select
              value={searchData.category}
              onChange={(e) =>
                setSearchData({ ...searchData, category: e.target.value })
              }
            >
              <option value="">Choose category: </option>
              <option value="Uncotegorized">Uncotegorized</option>
              <option value="Development">Development</option>
              <option value="Sport">Sport</option>
              <option value="Films">Films</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">Sort By:</label>
            <Select
              value={searchData.sortBy}
              onChange={(e) =>
                setSearchData({ ...searchData, sortBy: e.target.value })
              }
            >
              <option value="updatedAt">Latest</option>
              <option value="views">Most Viewed</option>
            </Select>
          </div>

          <Button color="dark" type="submit">
            Search
          </Button>
        </form>
      </div>
      {!!posts?.posts.length ? (
        <ul className="flex flex-wrap gap-10 my-10">
          {posts?.posts?.map((post) => (
            <RecentPostCard key={post._id} post={post} />
          ))}
        </ul>
      ) : (
        <div className="w-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-40">
          <NotFound />
        </div>
      )}
    </div>
  );
};

export default SearchPostsPage;
