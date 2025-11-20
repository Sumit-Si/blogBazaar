import { useLoaderData, useFetcher } from 'react-router-dom';
import { useEffect, useState, Fragment, useMemo, useCallback } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import CommentCard from '@/components/CommentCard';
import { Loader2Icon } from 'lucide-react';
import type { Comment, PaginateResponse } from '@/types';

type PaginateTo = 'first' | 'last' | 'previous' | 'next' | null;

const AdminComments = () => {
  const fetcher = useFetcher();
  const loaderData = useLoaderData() as PaginateResponse<Comment, 'comments'>;
  const fetcherData = fetcher.data as PaginateResponse<Comment, 'comments'>;

  const { offset, limit, total, comments } = useMemo(
    () => fetcherData || loaderData,
    [fetcherData, loaderData],
  );

  const [allComments, setAllComments] = useState<Comment[]>([]);

  const handleLoadMore = useCallback((offset: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set('offset', offset.toString());
    searchParams.set('limit', '2');

    fetcher.submit(searchParams.toString());
  }, []);

  useEffect(() => {
    setAllComments((prev) => [...prev, ...comments]);
  }, [comments]);

  const hasMoreComments = offset + limit < total;
  const isLoading =
    fetcher.state === 'loading' && fetcher.formAction === '/admin/comments';

  return (
    <div className='container p-4 space-y-4'>
      <h2 className='text-2xl font-semibold'>Comments</h2>

      <div>
        {allComments.map(
          ({ _id, content, likesCount, user, blog, createdAt }, index, arr) => (
            <Fragment key={_id}>
              <CommentCard
                content={content}
                likesCount={likesCount}
                user={user}
                blog={blog}
                createdAt={createdAt}
              />
              {index < arr.length - 1 && <Separator className='my-1' />}
            </Fragment>
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
          <p className='text-muted-foreground text-sm'>No more comments</p>
        )}
      </div>
    </div>
  );
};

export default AdminComments;
