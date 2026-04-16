/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/photo-*/' },
      { protocol: 'https', hostname: 'source.unsplash.com' }
    ]
  }
}

export default nextConfig

