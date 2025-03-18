import { ImageResponse } from 'next/og'
import { name } from '@/config/infoConfig'
import { getBlogBySlug, getAllBlogs } from '@/lib/blogs'

export const runtime = 'nodejs'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

// 这个配置告诉Next.js这是静态生成的图片
export const dynamic = 'force-static'

// 这个函数告诉Next.js哪些路径需要在构建时预渲染
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// 从URL获取博客文章标题
export default async function Image({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug)
  const title = blog?.title || name

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#030303',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '60px',
          color: 'white',
        }}
      >
        <div
          style={{
            marginLeft: '-3px',
            marginBottom: '30px',
            fontSize: '50px',
            fontWeight: 'bold',
            letterSpacing: '-0.025em',
            color: 'white',
            lineHeight: '1',
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '40px',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            letterSpacing: '-0.025em',
            lineHeight: '1.4',
            whiteSpace: 'pre-wrap',
            color: 'white',
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
} 