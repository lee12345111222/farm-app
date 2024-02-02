// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

// @ts-ignore
const withImages = require('next-images');
const path = require('path');

const withTM = require('next-transpile-modules')([
  'antd-mobile',
]);
// @ts-ignore
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
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}))


module.exports = nextConfig
