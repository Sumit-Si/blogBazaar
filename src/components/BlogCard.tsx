import { Link, Links } from 'react-router-dom';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { formatDistanceToNowStrict } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface BlogCardProps extends React.ComponentProps<'div'> {
  bannerUrl: string;
  bannerWidth: number;
  bannerHeight: number;
  title: string;
  content: string;
  slug: string;
  authorName: string;
  publishedAt: string;
  size?: 'default' | 'sm';
}

const BlogCard: React.FC<BlogCardProps> = ({
  bannerUrl,
  bannerHeight,
  bannerWidth,
  title,
  content,
  slug,
  authorName,
  publishedAt,
  size = 'default',
  className,
  ...props
}) => {
  return (
    <Card
      className={cn(
        'relative group pt-2 h-full @container',
        size === 'default' && 'flex flex-col-reverse justify-end',
        size === 'sm' && 'py-2 grid grid-cols-[1fr_1.15fr] gap-0 item-center',
        className,
      )}
      {...props}
    >
      <CardHeader
        className={cn(
          'gap-2',
          size === 'sm' && 'content-center order-1 ps-4 py-3',
        )}
      >
        <div className='flex items-center gap-2 text-muted-foreground text-sm font-medium'>
          <p className='@max-3xs:hidden'>{authorName}</p>

          <div className='w-1 h-1 rounded-full bg-muted-foreground/50 @max-3xs:hidden'></div>

          <Tooltip delayDuration={250}>
            <TooltipTrigger>
              {formatDistanceToNowStrict(publishedAt, { addSuffix: true })}
            </TooltipTrigger>

            <TooltipContent>
              {new Date(publishedAt).toLocaleString('en-US', {
                dateStyle: 'long',
                timeStyle: 'short',
              })}
            </TooltipContent>
          </Tooltip>
        </div>

        <Link
          to={`/blogs/${slug}`}
          viewTransition
        >
          <CardTitle
            className={cn(
              'underline-offset-4 hover:underline leading-tight line-clamp-2',
              size === 'default' && 'text-xl @md:text-2xl',
            )}
          >
            {title}
          </CardTitle>
        </Link>

        <CardDescription
          className={cn(
            'line-clamp-2 text-balance',
            size === 'sm' && '@max-2xs:hidden',
          )}
        >
          {content}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default BlogCard;
