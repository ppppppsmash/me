/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "placehold.jp",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "aceherblab.com",
      "lucent-fairy-5f9ca0.netlify.app",
      "game-survey-demo.vercel.app",
      "page-speed-measurement-nextapp-oclbewqdfa-an.a.run.app",
      "next-sanity-six-sooty.vercel.app",
      "tvgame-survey.netlify.app",
      "my-task-management-gamma.vercel.app",
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
