import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import type { Configuration } from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack: (config: Configuration) => {
    config.externals = [...(config.externals || []), 'sharp']
    return config
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default withPayload(nextConfig);
