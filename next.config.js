// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const withImages = require('next-images');
const path = require('path');

const withTM = require('next-transpile-modules')([
  'antd-mobile',
]);
const nextConfig = withTM(withImages({
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/base/:path*',
          destination: `http://54.153.241.236:8000/:path*`,
        },
      ],
    }
  },
}))


module.exports = nextConfig
