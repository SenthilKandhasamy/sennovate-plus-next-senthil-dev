"use server";

import { signIn } from "@/auth";

export async function login(formData: FormData) {
  let redirectTo;
  if (formData.get("redirectTo")) {
    redirectTo = String(formData.get("redirectTo"));
  }

  return signIn("cognito", {
    redirectTo,
  });
}
