import { allBlogs } from 'contentlayer/generated'

export type BlogType = {
  title: string
  description: string
  date: string
  slug: string
  url: string
}

export async function getAllBlogs() {
  return allBlogs.sort((a, z) => {
    const aDate = a.date ? new Date(a.date) : new Date(0);
    const zDate = z.date ? new Date(z.date) : new Date(0);
    return zDate.getTime() - aDate.getTime();
  });
}

export async function getBlogBySlug(slug: string) {
  return allBlogs.find((blog) => blog.slug === slug) || null;
}