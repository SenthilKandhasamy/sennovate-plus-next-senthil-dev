export function getUserType(roles?: string[]) {
  if (!roles) return "user";

  if (roles.includes("admin")) return "admin";
  if (roles.includes("direct-sales")) return "direct-sales";
  if (roles.includes("employee")) return "employee";

  return "user";
}

export type UserType = ReturnType<typeof getUserType>;
