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
      allowDangerousEmailAccountLinking: true,
      clientId,
      clientSecret,
      issuer,
      async profile(profile) {
        const incomingRoles = JSON.parse(profile["custom:roles"] || "[]");
        const roles = [];

        // Check for employee
        if (Array.isArray(profile.identities)) {
          const isEmployee =
            profile.identities[0]?.providerName ===
            process.env.COGNITO_SENNOVATE_IDP_NAME;
          if (isEmployee) roles.push("employee");
        }

        // Check For Admin
        if (incomingRoles.includes("Sennovate_Plus_Admin")) roles.push("admin");

        try {
          await db.user.update({
            where: { email: profile.email },
            data: { roles },
          });
        } catch (error) {
          console.log(error);
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
    session({ session, user }) {
      session.user.roles = (user as any).roles;
      session.user.id = user.id;
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
