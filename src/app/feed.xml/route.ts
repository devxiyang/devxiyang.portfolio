import { allBlogs } from 'contentlayer/generated'
import { name, email } from '@/config/infoConfig'

// 确保此路由生成静态文件
export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devxiyang.com';

  const author = {
    name: name,
    email: email,
  }

  // 按日期排序博客（最新的优先）
  const sortedBlogs = [...allBlogs].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // 生成 RSS feed XML
  let feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${author.name}</title>
    <link>${siteUrl}</link>
    <description>${name}'s blog</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <copyright>All rights reserved ${name} ${new Date().getFullYear()}</copyright>`;

  // 添加文章条目
  sortedBlogs.forEach(blog => {
    // 跳过日期无效的博客
    const pubDate = new Date(blog.date);
    if (isNaN(pubDate.getTime())) {
      return;
    }

    // 转义 XML 特殊字符
    const escapeXml = (unsafe: string): string => {
      return unsafe.replace(/[<>&'"]/g, (c: string) => {
        switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '\'': return '&apos;';
          case '"': return '&quot;';
          default: return c;
        }
      });
    };

    const title = escapeXml(blog.title);
    const description = escapeXml(blog.description || '');
    // 简化内容，只使用描述
    const content = description;

    feedXml += `
    <item>
      <title>${title}</title>
      <link>${siteUrl}${blog.url}</link>
      <guid isPermaLink="true">${siteUrl}${blog.url}</guid>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      <description><![CDATA[${content}]]></description>
      <author>${author.email} (${author.name})</author>
    </item>`;
  });

  // 关闭 RSS feed
  feedXml += `
  </channel>
</rss>`;

  return new Response(feedXml.trim(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
} 