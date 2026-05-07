import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Next.js from bundling Sanity server-side — avoids React.createContext
  // failures when collecting page data for /studio during production build.
  serverExternalPackages: ["sanity", "@sanity/client", "@sanity/image-url"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
