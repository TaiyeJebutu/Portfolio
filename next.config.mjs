// Static export for GitHub Pages.
// NEXT_PUBLIC_BASE_PATH is set by the deploy workflow: "" for a <user>.github.io
// repository, "/<repo-name>" for a project repository.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
