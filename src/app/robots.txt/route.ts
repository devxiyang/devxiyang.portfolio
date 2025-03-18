export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devxiyang.com';

  const robotsTxt = `
User-agent: *
Allow: /

# 禁止爬虫访问API路径
Disallow: /api/

# 站点地图
Sitemap: ${siteUrl}/sitemap.xml
`

  return new Response(robotsTxt.trim(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
} 