// first two lines to use 'require'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withMDX(nextConfig);