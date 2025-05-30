import { type Metadata } from 'next'

import { Card } from '@/components/shared/Card'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { getAllBlogs } from '@/lib/blogs'
import { formatDate } from '@/lib/formatDate'
import { blogHeadLine, blogIntro, name } from '@/config/infoConfig'
import { Blog as BlogType } from 'contentlayer/generated'
import { generateHomeSchema } from '@/lib/generate-schema'
import { LanguageTag } from '@/components/shared/LanguageTag'

export const runtime = process.env.NEXT_RUNTIME === 'edge' ? 'edge' : 'nodejs'

// 确保此页面可以静态生成
export const dynamic = 'force-static';

function Blog({ blog }: { blog: BlogType }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blogs/${blog.slug}`}>
          <span className="inline-flex items-center">
            {blog.title}
            <LanguageTag language={blog.language} />
          </span>
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={blog.date}
          className="md:hidden"
          decorate
        >
          {formatDate(blog.date)}
        </Card.Eyebrow>
        <Card.Description>{blog.description}</Card.Description>
        <Card.Cta>Read blog</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={blog.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(blog.date)}
      </Card.Eyebrow>
    </article>
  )
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devxiyang.com';

export const metadata: Metadata = {
  title: 'Blogs',
  description: blogIntro,
  openGraph: {
    title: `Blog - ${name}`,
    description: blogIntro,
    type: 'website',
    url: `${siteUrl}/blogs`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog - ${name}`,
    description: blogIntro,
  },
  alternates: {
    canonical: `${siteUrl}/blogs`,
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
      'application/ld+json': JSON.stringify(
        generateHomeSchema(siteUrl)
      ),
    },
  }
}

export default async function BlogsIndex() {
  let blogs = await getAllBlogs()

  return (
    <SimpleLayout
      title={blogHeadLine}
      intro={blogIntro}
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {blogs.map((blog) => (
            <Blog key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
