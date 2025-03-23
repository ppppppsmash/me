/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "placehold.jp",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "api.microlink.io",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/29497177"
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        port: "",
        pathname: "/**"
      },
    ]
  },
}

module.exports = nextConfig;
