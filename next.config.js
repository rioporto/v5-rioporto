/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Experimental options to handle static generation issues
  experimental: {
    // Increase retry count for failed static generation
    staticGenerationRetryCount: 3,
    // Reduce concurrency to avoid timeouts
    staticGenerationMaxConcurrency: 4,
    // Increase minimum pages per worker
    staticGenerationMinPagesPerWorker: 10,
  },
  // Force dynamic rendering for problematic pages during build
  // Remove this after resolving all issues
  generateBuildId: async () => {
    // This ensures a unique build ID for each deployment
    return `build-${Date.now()}`
  },
}

module.exports = nextConfig