/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["img.icons8.com"], // добавлен этот домен
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
