import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig, User } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { db } from "./db";

declare module "next-auth" {
  export interface Session {
    user: User & {
      roles: string[];
    };
  }
}

const clientId = process.env.COGNITO_CLIENT_ID;
const clientSecret = process.env.COGNITO_CLIENT_SECRET;
const issuer = process.env.COGNITO_ISSUER;

if (!clientId || !clientSecret || !issuer) {
  throw new Error("Cognito Credentials are not set");
}

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    CognitoProvider({
      clientId,
      clientSecret,
      issuer,
      async profile(profile) {
        const roles = JSON.parse(profile["custom:roles"] || "[]");
        const isEmployee =
          profile.identities?.providerName ===
          process.env.COGNITO_SENNOVATE_IDP_NAME;
        if (isEmployee) roles.push("employee");
        if (roles.includes("Sennovate_Plus_Admin")) roles.push("admin");

        return {
          id: profile.sub,
          email: profile.email,
          roles,
        };
      },
      checks: ["nonce"] as any,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.roles = (user as any).roles;
      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth: getServerSession,
  signOut,
  signIn,
} = NextAuth(authOptions);
