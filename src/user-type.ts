export function getUserType(roles?: string[]) {
  if (!roles) return "user";

  if (roles.includes("admin")) return "admin";
  if (roles.includes("employee")) return "employee";

  if (roles.includes("reseller")) return "reseller";
  if (roles.includes("referral")) return "referral";

  return "user";
}
