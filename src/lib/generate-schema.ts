import { name, headline, introduction, avatarUrl } from '@/config/infoConfig'

// 生成博客文章的结构化数据
export function generateBlogSchema(
  blog: {
    title: string;
    description: string;
    date: string | Date;
    url: string;
  },
  url: string
) {
  const datePublished = new Date(blog.date).toISOString();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.description,
    author: {
      '@type': 'Person',
      name: name,
    },
    datePublished,
    dateModified: datePublished,
    image: avatarUrl || `${url}/images/og-image.jpg`,
    url: `${url}${blog.url}`,
    publisher: {
      '@type': 'Person',
      name: name,
      logo: {
        '@type': 'ImageObject',
        url: avatarUrl || `${url}/images/og-image.jpg`,
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}${blog.url}`,
    },
  };
}

// 生成首页的结构化数据
export function generateHomeSchema(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: name,
    description: headline || introduction,
    url: url,
    potentialAction: {
      '@type': 'SearchAction',
      'target': `${url}/blogs?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

// 生成个人信息的结构化数据
export function generatePersonSchema(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    description: headline || introduction,
    url: url,
    image: avatarUrl || `${url}/images/og-image.jpg`,
    sameAs: [
      // 这里可以添加社交媒体链接
    ]
  };
} 