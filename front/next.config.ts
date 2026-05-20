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
};

export default nextConfig;
