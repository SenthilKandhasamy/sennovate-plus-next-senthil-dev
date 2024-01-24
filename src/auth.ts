import NextAuth, { NextAuthConfig } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

declare module "next-auth" {
  export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    groups?: string[] | null;
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
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          groups: ["admin"],
        };
      },
      checks: ["nonce"] as any,
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.groups = user.groups;
      return token;
    },
    session({ session, token }) {
      session.user.groups = token.groups as any;
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
