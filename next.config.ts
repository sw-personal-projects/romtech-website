import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  skipMiddlewareUrlNormalize: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'romtech.bt',
      },
    ],
  },
};

export default nextConfig;
