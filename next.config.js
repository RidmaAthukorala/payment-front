/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,

  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ["en-US", "en_GB"],
    defaultLocale: "en-US",
  },
  env: {
    URL: process.env.URL,
    BASE_URL: process.env.BASE_URL,
    AUTH_BASE_URL: process.env.AUTH_BASE_URL,
    STRIPE_BASE_URL: process.env.STRIPE_BASE_URL,
    PAYPAL_BASE_URL: process.env.PAYPAL_BASE_URL,
    STRIPE_PK: process.env.STRIPE_PK,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  },
};

module.exports = nextConfig;
