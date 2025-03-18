import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'favicon.im'
      },
      {
        protocol: 'https',
        hostname: 'www.google.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  // 永久重定向 - 提升SEO和用户体验
  async redirects() {
    return [
      // 示例: 旧URL结构重定向到新的URL
      // 确保所有带尾部斜杠的URL重定向到不带斜杠的形式
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ]
  },
  // 自定义HTTP标头 - 提升安全性和性能
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // 静态文件缓存优化
      {
        source: '/:path*(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ]
  },
  // 配置输出为静态导出
  output: 'export',
  // 处理图像压缩
  compress: true,
  // 禁用ESLint在构建时运行
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 忽略构建时的类型检查错误
  typescript: {
    ignoreBuildErrors: true,
  },
  // 禁用过大的页面大小警告
  experimental: {
    largePageDataBytes: 512 * 100000, // 约50MB
  },
}

export default withContentlayer(nextConfig)
