"use server";

import { signIn } from "@/auth";

export async function login(formData: FormData) {
  return signIn("cognito", {
    redirectTo: "/",
  });
}

export async function loginWithSennovate(formData: FormData) {
  return signIn(
    "cognito",
    {
      redirectTo: "/",
    },
    {
      idp_identifier: process.env.COGNITO_SENNOVATE_IDP_IDENTIFIER || "",
    }
  );
}
