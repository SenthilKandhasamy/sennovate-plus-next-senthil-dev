import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function isDatabaseUniqueConstraintError(error: unknown, field: string) {
  if (!(error instanceof PrismaClientKnownRequestError)) return false;
  if (!error.message.includes("Unique constraint")) return false;
  if (!(error.meta?.target as any).includes(field)) return false;
  return true;
}
