import { AdminCreateUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "./cognito-client";

interface AdminCreateUserProps {
  email: string;
}

const UserPoolId = process.env.COGNITO_USER_POOL_ID;
if (!UserPoolId) {
  throw new Error("UserPoolId is not set");
}

export async function adminCreateUser({ email }: AdminCreateUserProps) {
  return cognitoClient.send(
    new AdminCreateUserCommand({
      Username: email,
      UserPoolId,
    })
  );
}
