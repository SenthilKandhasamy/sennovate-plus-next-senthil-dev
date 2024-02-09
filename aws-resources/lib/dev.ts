import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { dev } from "../env";
import { SennovatePlusUserPool } from "./user-pool";

export class SennovatePlusDevStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new SennovatePlusUserPool(this, "SennovatePlusDevUserPool", dev.userPool);
  }
}
