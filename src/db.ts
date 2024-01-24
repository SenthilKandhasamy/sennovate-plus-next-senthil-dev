import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

export const db = (globalThis as unknown as any).db ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production")
  (globalThis as unknown as any).db = db;
