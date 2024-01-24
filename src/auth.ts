import NextAuth, { NextAuthConfig } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { db } from "./db";

declare module "next-auth" {
  export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roles: string[];
  }
  export interface Session {
    user: User;
  }
}

const clientId = process.env.COGNITO_CLIENT_ID;
const clientSecret = process.env.COGNITO_CLIENT_SECRET;
const issuer = process.env.COGNITO_ISSUER;

if (!clientId || !clientSecret || !issuer) {
  throw new Error("Cognito Credentials are not set");
}

const authOptions: NextAuthConfig = {
  providers: [
    CognitoProvider({
      clientId,
      clientSecret,
      issuer,
      async profile(profile) {
        const isEmployee =
          profile.identities?.providerName ===
          process.env.COGNITO_SENNOVATE_IDP_NAME;
        const roles = JSON.parse(profile["custom:roles"] || "[]");

        if (isEmployee) roles.push("employee");
        if (roles.includes("Sennovate_Plus_Admin")) roles.push("admin");
        if (!isEmployee) {
          roles.push("partner");
          const partner = await db.user.findFirst({
            where: {
              companyEmail: profile.email,
            },
          });
          if (partner) {
            roles.push(partner.partnershipType.toLocaleLowerCase());
          }
        }

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
    jwt({ token, user }) {
      if (user) token.roles = user.roles;
      return token;
    },
    session({ session, token }) {
      session.user.roles = token.roles as any;
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
