import Link from 'next/link';
import { BlogType } from '@/lib/blogs';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/shared/Icons';

type BlogNavigationProps = {
  prevBlog: BlogType | null;
  nextBlog: BlogType | null;
};

export function BlogNavigation({ prevBlog, nextBlog }: BlogNavigationProps) {
  return (
    <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-700/40">
      <div className="flex justify-between items-center">
        {prevBlog ? (
          <Link
            href={prevBlog.url}
            className="group flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeftIcon className="mr-1 h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            <span>Older Post: {prevBlog.title}</span>
          </Link>
        ) : (
          <div className="invisible" />
        )}

        {nextBlog ? (
          <Link
            href={nextBlog.url}
            className="group flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <span>Newer Post: {nextBlog.title}</span>
            <ArrowRightIcon className="ml-1 h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
          </Link>
        ) : (
          <div className="invisible" />
        )}
      </div>
    </div>
  );
} 