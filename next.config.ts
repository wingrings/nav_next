import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/', // 匹配的路径
        destination: '/home', // 重定向目标路径
        permanent: false, // 是否永久重定向
      },
    ];
  },
};

export default withNextIntl(nextConfig);