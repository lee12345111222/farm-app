// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

// @ts-ignore
const withImages = require("next-images");
const path = require("path");

const withTM = require("next-transpile-modules")(["antd-mobile"]);
// @ts-ignore
const nextConfig = withTM(
  withImages({
    i18n: {
      locales: ["en", "zh"],
      defaultLocale: "en",
    },
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
    async rewrites() {
      return {
        fallback: [
          {
            source: "/base/:path*",
            destination: `http://3.24.139.201:8000/:path*`,
          },
        ],
      };
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    // reactStrictMode: true, // Enable React strict mode for improved error handling
    // swcMinify: true, // Enable SWC minification for improved performance
    compiler: {
      removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
    },
  })
);

// Configuration object tells the next-pwa plugin
const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  // disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  // register: true, // Register the PWA service worker
  // skipWaiting: true, // Skip waiting for service worker activation
});
// console.log('unhandledRejection')

// process.on('unhandledRejection', error => {
// 	console.log('unhandledRejection', error);
// });

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig);
