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
  // async rewrites() {
  //   return {
  //     fallback: [
  //       {
  //         source: '/ingest/:path*',
  //         destination: `https://custom-routes-proxying-endpoint.vercel.app/:path*`,
  //       },
  //     ],
  //   }
  // },
}))


module.exports = nextConfig
