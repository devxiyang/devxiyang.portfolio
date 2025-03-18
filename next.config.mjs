import { withContentlayer } from 'next-contentlayer2'

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
}

export default withContentlayer(nextConfig)
