import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  // Force Next to trace from the pnpm workspace root.
  // This guarantees the standalone output is placed at:
  //   .next/standalone/front/server.js
  // and that hoisted node_modules from the workspace root are bundled in.
  outputFileTracingRoot: path.join(__dirname, ".."),
  
  // Allow images from Strapi (both local dev and production)
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "backoffice.wubrg.online",
        pathname: "/uploads/**",
      },
      {
        // Internal Docker network
        protocol: "http",
        hostname: "back",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
