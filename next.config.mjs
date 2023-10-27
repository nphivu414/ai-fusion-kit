import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import createMDX from '@next/mdx'
import { withAxiom } from 'next-axiom'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/*/**',
      },
    ],
  },
}

const withMDX = createMDX({
  options: {
    extension: /\.mdx?$/,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight]
  },
})

export default withAxiom(withMDX(nextConfig))
