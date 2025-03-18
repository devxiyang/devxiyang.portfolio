const fs = require('fs');
const path = require('path');
const { Feed } = require('feed');

// 这个脚本手动生成 RSS feed 文件，因为在静态导出模式下 API 路由不会工作
async function generateRssFeed() {
  // 导入配置数据，这与 route.ts 中使用的相同
  const infoConfig = require('../src/config/infoConfig');
  const { name, email } = infoConfig;

  // 获取博客数据
  // 注意：在构建脚本中，我们需要通过读取 .contentlayer 目录来获取数据
  const contentlayerPath = path.join(process.cwd(), '.contentlayer/generated/Blog/_index.json');
  const allBlogsData = JSON.parse(fs.readFileSync(contentlayerPath, 'utf8'));
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devxiyang.com';
  
  const author = {
    name: name,
    email: email,
  };

  const feed = new Feed({
    title: author.name,
    description: name + '\'s blog',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${name} ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  });

  // 按日期排序博客（最新的优先）
  const sortedBlogs = [...allBlogsData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // 将每篇博客添加到 feed
  for (const blog of sortedBlogs) {
    // 跳过日期无效的博客
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
      content: blog.body.raw, // 使用原始 MDX 内容
      author: [author],
      date: pubDate,
    });
  }

  // 写入到 public 目录
  const publicDir = path.join(process.cwd(), 'public');
  
  // 确保目录存在
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), feed.rss2());
  console.log('RSS feed 生成完成！');
}

// 执行生成函数
generateRssFeed().catch(console.error); 