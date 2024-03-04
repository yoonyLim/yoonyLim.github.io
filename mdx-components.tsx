/* 
 * This file is required to use 'mdx' files(mixture of markdown and react)
 * next.config.js is also modified to include 'mdx' as a file extension
 * For details, check out https://nextjs.org/docs/app/building-your-application/configuring/mdx
*/

import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
    };
}