/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        runtime: 'nodejs',
      },
    images: {
        domains: ["utfs.io"] // Allow all domains
    }
};

export default nextConfig;
