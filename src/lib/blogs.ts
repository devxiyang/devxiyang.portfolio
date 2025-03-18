import { allBlogs } from 'contentlayer/generated'

export type BlogType = {
  title: string
  description: string
  date: string
  slug: string
  url: string
  language?: string
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

export async function getAdjacentBlogs(slug: string) {
  // Get all blogs sorted by date (newest first)
  const sortedBlogs = await getAllBlogs();
  
  // Find the index of the current blog
  const currentIndex = sortedBlogs.findIndex((blog) => blog.slug === slug);
  
  // If blog not found, return null for both
  if (currentIndex === -1) {
    return { prevBlog: null, nextBlog: null };
  }
  
  // Get previous (newer) and next (older) blogs
  // Note: Since blogs are sorted newest first, 
  // the "previous" is actually the next item in the array
  const prevBlog = currentIndex < sortedBlogs.length - 1 ? sortedBlogs[currentIndex + 1] : null;
  const nextBlog = currentIndex > 0 ? sortedBlogs[currentIndex - 1] : null;
  
  return { prevBlog, nextBlog };
}