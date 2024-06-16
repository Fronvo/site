/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.FRONVO_API_URL}/:path*`,
      },
    ];
  },
  webpack: (config, _) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    return config;
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  env: {
    SOCKET_URL: process.env.FRONVO_API_URL,
  },
};

export default nextConfig;
