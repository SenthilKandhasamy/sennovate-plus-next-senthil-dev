import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { prod } from "../env";
import { SennovatePlusUserPool } from "./user-pool";

export class SennovatePlusProdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new SennovatePlusUserPool(this, "SennovatePlusProdUserPool", prod.userPool);
  }
}
