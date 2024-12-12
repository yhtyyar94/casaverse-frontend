/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: [
  //     "i.ibb.co",
  //     "localhost",
  //     "127.0.0.1",
  //     "https://orion-backend-ytt6.onrender.com",
  //     "lh3.googleusercontent.com",
  //     "res.cloudinary.com",
  //     "media.s-bol.com",
  //     process.env.NEXT_PUBLIC_API_URL,
  //   ],
  // },
  images: { unoptimized: true },
};

module.exports = nextConfig;
