import { PrismaClient } from "@prisma/client";

// 全局类型定义
declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'production') {
  globalThis.prisma = client;
}

export default client;
