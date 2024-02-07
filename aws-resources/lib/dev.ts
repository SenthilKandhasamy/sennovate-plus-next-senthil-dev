import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { config } from "dotenv";
import { resolve } from "path";
import { SennovatePlusUserPool } from "./user-pool";

config({ path: resolve(__dirname, "../../.env") });

export class SennovatePlusDevStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new SennovatePlusUserPool(this, "SennovatePlusDevUserPool", {
      userPoolName: "sennovate-plus-dev",
      domainPrefix: process.env.COGNITO_DOMAIN_PREFIX!,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      appClient: {
        callbackUrls: [
          "http://localhost:3000/api/auth/callback/cognito",
          "https://sennovate-plus-next-git-dev-shobhan-biswas-projects-679b9bb7.vercel.app/api/auth/callback/cognito",
        ],
        logoutUrls: [
          "http://localhost:3000",
          "https://sennovate-plus-next-git-dev-shobhan-biswas-projects-679b9bb7.vercel.app",
        ],
      },
      oidc: {
        clientId: process.env.SENNOVATE_IDAPTIVE_CLIENT_ID!,
        clientSecret: process.env.SENNOVATE_IDAPTIVE_CLIENT_SECRET!,
        issuerUrl: process.env.SENNOVATE_IDAPTIVE_ISSUER_URL!,
        name: process.env.IDENTITY_PROVIDER_NAME!,
      },
    });
  }
}
