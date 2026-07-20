import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 管理されたWindows環境でも型検査・静的生成を実行できるよう、
  // 子プロセスではなくNode.jsのworker_threadsを使う。
  experimental: {
    cpus: 1,
    workerThreads: true,
  },
};

export default nextConfig;
