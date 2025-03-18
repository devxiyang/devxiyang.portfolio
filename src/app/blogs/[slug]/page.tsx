import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getBlogBySlug, getAllBlogs, getAdjacentBlogs } from '@/lib/blogs'
import { getMDXContent } from '@/lib/mdx'
import { BlogLayout } from '@/components/layout/BlogLayout'
import { generateBlogSchema } from '@/lib/generate-schema'
import { name } from '@/config/infoConfig'
import { BlogNavigation } from '@/components/shared/BlogNavigation'

export const runtime = process.env.NEXT_RUNTIME === 'edge' ? 'edge' : 'nodejs'

interface Props {
  params: {
    slug: string
  }
}

// 这个函数告诉Next.js哪些路径需要在构建时预渲染
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug)
  if (!blog) {
    return {
      title: 'Blog not found',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  
  // 生成标准JSON-LD结构化数据
  const jsonLd = generateBlogSchema(blog, siteUrl || '')

  return {
    title: blog.title,
    description: blog.description,
    authors: [{ name }],
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      publishedTime: new Date(blog.date).toISOString(),
      url: `${siteUrl}${blog.url}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
    },
    alternates: {
      canonical: `${siteUrl}${blog.url}`,
      types: {
        'application/ld+json': JSON.stringify(jsonLd),
      },
    },
    other: {
      'language': blog.language || 'en',
    },
  }
}

export default async function BlogPage({ params }: Props) {
  const blog = await getBlogBySlug(params.slug)
  
  if (!blog) {
    notFound()
  }

  const { prevBlog, nextBlog } = await getAdjacentBlogs(params.slug)
  const MDXContent = getMDXContent(blog.body.code)

  return (
    <BlogLayout
      blog={blog}
      prevBlog={prevBlog}
      nextBlog={nextBlog}
    >
      <div className="mt-8 prose dark:prose-invert">
        <MDXContent />
      </div>
      <BlogNavigation prevBlog={prevBlog} nextBlog={nextBlog} />
    </BlogLayout>
  )
}