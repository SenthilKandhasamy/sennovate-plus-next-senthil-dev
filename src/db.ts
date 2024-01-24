import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

export const db = ((globalThis as any).db ??
  prismaClientSingleton()) as ReturnType<typeof prismaClientSingleton>;

if (process.env.NODE_ENV !== "production") (globalThis as any).db = db;
