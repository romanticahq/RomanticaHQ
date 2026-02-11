/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // Optional: proxy API calls through the Next server (useful when running without Nginx).
    // Set API_PROXY_TARGET to something like http://localhost:8080 or http://backend:8080 (docker-compose).
    const target = process.env.API_PROXY_TARGET;
    if (!target) return [];
    return [
      {
        source: '/api/:path*',
        destination: `${target}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
