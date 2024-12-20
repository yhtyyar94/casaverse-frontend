/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  rewrites: async () => {
    return [
      {
        source: '/api/sitemap.xml',
        destination: 'https://casaverse-backend.onrender.com/dashboard/sitemap.xml',
      },
    ];
  }
};

module.exports = nextConfig;
