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
        const path = post._raw.flattenedPath
        if (path.includes('/en/') || path.startsWith('en-')) {
          return 'en'
        } else if (path.includes('/zh/') || path.startsWith('zh-')) {
          return 'zh'
        } else {
          return 'en' // Default language
        }
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