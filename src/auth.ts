import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

const clientId = process.env.COGNITO_CLIENT_ID;
const clientSecret = process.env.COGNITO_CLIENT_SECRET;
const issuer = process.env.COGNITO_ISSUER;

if (!clientId || !clientSecret || !issuer) {
  throw new Error("Cognito Credentials are not set");
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  providers: [
    CognitoProvider({
      clientId,
      clientSecret,
      issuer,
    }),
  ],
});
