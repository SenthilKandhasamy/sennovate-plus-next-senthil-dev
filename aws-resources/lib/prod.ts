import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { readFileSync } from "fs";
import { resolve } from "path";
import { SennovatePlusUserPool } from "./user-pool";

const env = JSON.parse(
  readFileSync(resolve(__dirname, "../env.json"), "utf-8")
);

export class SennovatePlusProdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new SennovatePlusUserPool(this, "SennovatePlusProdUserPool", {
      ...env.prod.userPool,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });
  }
}
