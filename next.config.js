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
    locales: ['en', 'fr', 'nl'],
    defaultLocale: 'en',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}))

module.exports = nextConfig
