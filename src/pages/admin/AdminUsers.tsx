import { useLoaderData, useFetcher } from 'react-router-dom';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import UserCard from '@/components/UserCard';
import useUser from '@/hooks/useUser';
import { Loader2Icon } from 'lucide-react';
import type { User, PaginateResponse } from '@/types';

type PaginateTo = 'first' | 'last' | 'previous' | 'next' | null;

const AdminUsers = () => {
  const fetcher = useFetcher();
  const loggedInUser = useUser();
  const loaderData = useLoaderData() as PaginateResponse<User, 'users'>;
  const fetcherData = fetcher.data as PaginateResponse<User, 'users'>;

  const { offset, limit, total, users } = useMemo(
    () => fetcherData || loaderData,
    [fetcherData, loaderData],
  );

  const [allUsers, setAllUsers] = useState<User[]>([]);

  const handleLoadMore = useCallback((offset: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set('offset', offset.toString());
    searchParams.set('limit', '2');

    fetcher.submit(searchParams.toString());
  }, []);

  useEffect(() => {
    setAllUsers((prev) => [...prev, ...users]);
  }, [users]);

  const hasMoreComments = offset + limit < total;
  const isLoading =
    fetcher.state === 'loading' && fetcher.formAction === '/admin/users';

  return (
    <div className='container p-4 space-y-4'>
      <h2 className='text-2xl font-semibold'>Users</h2>

      <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-3'>
        {allUsers.map(
          ({ _id, username, email, role, firstName, lastName, createdAt }) => (
              <UserCard
                key={_id}
                userId={_id}
                email={email}
                firstName={firstName}
                lastName={lastName}
                username={username}
                role={role}
                createdAt={createdAt}
                loggedInUser={loggedInUser}
                onUserDeleteSuccess={() => {
                    setAllUsers((prev) => prev.filter((user) => user._id !== _id));
                }}
              />
          ),
        )}
      </div>

      <div className='flex justify-center my-4'>
        {hasMoreComments ? (
          <Button
            variant={'outline'}
            onClick={handleLoadMore.bind(null, offset + limit)}
            disabled={isLoading}
          >
            Load more
            {isLoading && <Loader2Icon className='animate-spin' />}
          </Button>
        ) : (
          <p className='text-muted-foreground text-sm'>No more users</p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
