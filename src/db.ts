import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var db: ReturnType<typeof prismaClientSingleton>;
}
export const db = globalThis.db ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.db = db;
