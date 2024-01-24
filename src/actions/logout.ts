"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function logout() {
  await signOut({
    redirect: false,
  });

  const client_id = process.env.COGNITO_CLIENT_ID;
  const hostedUiDomain = process.env.COGNITO_HOSTED_UI_DOMAIN;
  const logout_uri = process.env.COGNITO_LOGOUT_URI;

  if (client_id && hostedUiDomain && logout_uri) {
    const redirectUri = `${hostedUiDomain}/logout?${new URLSearchParams({
      client_id,
      logout_uri,
    }).toString()}`;
    redirect(redirectUri);
  }
}
