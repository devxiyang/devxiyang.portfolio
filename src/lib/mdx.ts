import { useMDXComponent as useNextMDXComponent } from 'next-contentlayer/hooks'
import { mdxComponents } from '@/components/shared/MdxComponents'
import React from 'react'

// Create a proper custom hook (named starting with "use")
export function useMDXComponent(code: string) {
  const MDXComponent = useNextMDXComponent(code);
  return React.createElement(MDXComponent, { components: mdxComponents });
}

// Function to get MDX content for a blog
export function getMDXContent(code: string) {
  // This function doesn't use hooks directly
  return function MDXContent(props: any) {
    // This is a React component where we can use the custom hook
    const Content = useMDXComponent(code);
    return React.createElement('div', props, Content);
  };
}