import { Feed } from 'feed'
import { name, email } from '@/config/infoConfig'
import { allBlogs } from 'contentlayer/generated'

export async function GET(req: Request) {
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable')
  }

  let author = {
    name: name,
    email: email,
  }

  let feed = new Feed({
    title: author.name,
    description: name + '\'s blog',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${name} ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed`,
    },
  })

  // Sort blogs by date (newest first)
  const sortedBlogs = [...allBlogs].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Add each blog to the feed
  for (const blog of sortedBlogs) {
    // Skip if the date is invalid
    const pubDate = new Date(blog.date);
    if (isNaN(pubDate.getTime())) {
      console.warn(`Skipping blog with invalid date: ${blog.slug}`);
      continue;
    }

    feed.addItem({
      title: blog.title,
      id: `${siteUrl}${blog.url}`,
      link: `${siteUrl}${blog.url}`,
      description: blog.description,
      content: blog.body.raw, // Use the raw MDX content
      author: [author],
      date: pubDate,
    });
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'cache-control': 's-maxage=86400', // one day cache
    },
  })
}
