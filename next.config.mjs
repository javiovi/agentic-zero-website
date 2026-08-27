/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    '*': ['./public/llms.txt'],
  },
  async rewrites() {
    return [
      {
        source: '/llms.md',
        destination: '/llms.txt',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Vary',
            value:
              'rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept, Accept-Encoding',
          },
          {
            key: 'Link',
            value: '<https://agenticzero.xyz/llms.txt>; rel="alternate"; type="text/plain"',
          },
        ],
      },
      {
        source: '/blog/:slug',
        headers: [
          {
            key: 'Vary',
            value:
              'rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept, Accept-Encoding',
          },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Vary', value: 'Accept, Accept-Encoding' },
        ],
      },
      {
        source: '/llms.md',
        headers: [
          { key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Vary', value: 'Accept, Accept-Encoding' },
        ],
      },
    ]
  },
}

export default nextConfig
