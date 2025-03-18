import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrism from '@mapbox/rehype-prism'
import remarkGfm from 'remark-gfm'

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => {
        // Extract the slug without directory structure
        const pathSegments = post._raw.flattenedPath.split('/');
        const fileName = pathSegments[pathSegments.length - 1];
        return `/blogs/${fileName}`;
      },
    },
    slug: {
      type: 'string',
      resolve: (post) => {
        // Extract the slug without directory structure
        const pathSegments = post._raw.flattenedPath.split('/');
        return pathSegments[pathSegments.length - 1];
      },
    },
    language: {
      type: 'string',
      resolve: (post) => {
        const path = post._raw.sourceFilePath;
        // 如果文件在 blog/en 目录下，则为英文
        if (path.includes('blog/en/')) {
          return 'en';
        }
        // 否则默认为中文
        return 'zh';
      }
    }
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
}) 