import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.COGNITO_REGION;

if (!accessKeyId || !secretAccessKey || !region) {
  throw new Error("AWS Secrets or region is not set");
}

export const cognitoClient = new CognitoIdentityProviderClient({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});
