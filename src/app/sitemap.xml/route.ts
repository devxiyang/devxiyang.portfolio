import { allBlogs } from 'contentlayer/generated'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable')
  }

  // Define the static pages of your website
  const staticPages = [
    '',               // homepage
    '/about',
    '/projects',
    '/blogs',
    '/uses',
    '/contact',
  ]

  // Generate sitemap entries for all static pages
  const staticPagesXml = staticPages
    .map(page => {
      const url = `${siteUrl}${page}`
      return `
        <url>
          <loc>${url}</loc>
          <changefreq>monthly</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
      `
    })
    .join('')

  // Generate sitemap entries for all blog posts
  const blogPagesXml = allBlogs
    .map(blog => {
      // Skip entries with invalid dates
      if (!blog.date || isNaN(new Date(blog.date).getTime())) {
        return ''
      }

      const url = `${siteUrl}${blog.url}`
      const lastmod = new Date(blog.date).toISOString().split('T')[0]
      
      return `
        <url>
          <loc>${url}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `
    })
    .join('')

  // Construct the full sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPagesXml}
      ${blogPagesXml}
    </urlset>
  `

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  })
} 