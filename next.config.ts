/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'drupa-backend.lndo.site',
        port: '',
        pathname: '/sites/default/files/**',
      },
      {
        protocol: 'https',
        hostname: 'api.meubackend.com.br',
        port: '',
        pathname: '/sites/default/files/**',
      },
    ],
  },
};

export default nextConfig;
